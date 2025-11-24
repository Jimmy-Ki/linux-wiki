---
title: lscpu - Display CPU Architecture Information
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lscpu - Display CPU Architecture Information

The `lscpu` command displays detailed information about the CPU architecture, including processor type, manufacturer, core count, cache sizes, and topology. It's an essential tool for system administrators and developers to understand the hardware capabilities of their Linux system.

## Basic Syntax

```bash
lscpu [options]
```

## Common Options

### CPU Selection
- `-a, --all` - Display online and offline CPUs (default for -e)
- `-b, --online` - Display only online CPUs (default for -p)
- `-c, --offline` - Display only offline CPUs

### Output Format
- `-e, --extended[=<list>]` - Display in extended readable format
- `-p, --parse[=<list>]` - Display in parseable format
- `-x, --hex` - Display hexadecimal masks instead of CPU lists

### System Options
- `-s, --sysroot <dir>` - Use specified directory as system root
- `-h, --help` - Display help message
- `-V, --version` - Display version information

## Usage Examples

### Basic CPU Information
```bash
# Display comprehensive CPU information
lscpu

# Typical output:
Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
CPU(s):              8
On-line CPU(s) list: 0-7
Thread(s) per core:  2
Core(s) per socket:  4
Socket(s):           2
NUMA node(s):        1
Vendor ID:           GenuineIntel
CPU family:          6
Model:               85
Model name:          Intel(R) Xeon(R) Silver 4210 CPU @ 2.20GHz
Stepping:            7
CPU MHz:             2200.000
BogoMIPS:            4400.00
Virtualization:      VT-x
L1d cache:           32K
L1i cache:           32K
L2 cache:            1024K
L3 cache:            16896K
NUMA node0 CPU(s):   0-7
```

### Extended Format Output
```bash
# Display detailed extended information
lscpu -e

# Output shows CPU hierarchy and topology
CPU NODE SOCKET CORE L1d:L1i:L2:L3 ONLINE MAXMHZ    MINMHZ
0   0    0      0    0:0:0:0       yes    3200.0000 1000.0000
1   0    0      0    0:0:0:0       yes    3200.0000 1000.0000
2   0    0      1    1:1:1:0       yes    3200.0000 1000.0000
3   0    0      1    1:1:1:0       yes    3200.0000 1000.0000
4   0    1      0    2:2:2:0       yes    3200.0000 1000.0000
5   0    1      0    2:2:2:0       yes    3200.0000 1000.0000
6   0    1      1    3:3:3:0       yes    3200.0000 1000.0000
7   0    1      1    3:3:3:0       yes    3200.0000 1000.0000
```

### Parseable Output
```bash
# Generate machine-readable output
lscpu -p

# Output format: CPU,Core,Socket,Node,Online
#0,0,0,0,Y
#1,0,0,0,Y
#2,1,0,0,Y
#3,1,0,0,Y
```

### Custom Field Selection
```bash
# Select specific fields for extended format
lscpu -e=cpu,node,socket,core,online

# Custom parseable fields
lscpu -p=cpu,core,socket,mhz
```

### Show All CPUs Including Offline
```bash
# Display both online and offline CPUs
lscpu -a

# Show only offline CPUs
lscpu -c
```

### Hexadecimal CPU Masks
```bash
# Display CPU masks in hexadecimal
lscpu -x

# Useful for affinity mask calculations
```

## Practical Examples

### CPU Topology Analysis
```bash
# Analyze CPU topology and hierarchy
lscpu -e=cpu,core,socket,node

# Check hyper-threading status
threads_per_core=$(lscpu | grep "Thread(s) per core" | awk '{print $4}')
if [ "$threads_per_core" -gt 1 ]; then
    echo "Hyper-threading is enabled"
else
    echo "Hyper-threading is disabled"
fi

# Get core count per socket
cores_per_socket=$(lscpu | grep "Core(s) per socket" | awk '{print $4}')
echo "Cores per socket: $cores_per_socket"
```

### Performance Optimization
```bash
# Get CPU count for parallel processing
cpu_count=$(lscpu | grep "^CPU(s):" | awk '{print $2}')
echo "Using $cpu_count CPU cores for processing"

# Calculate optimal thread pool size
optimal_threads=$(($(lscpu | grep "^CPU(s):" | awk '{print $2}') * 2))
echo "Optimal thread pool size: $optimal_threads"

# Check NUMA configuration
numa_nodes=$(lscpu | grep "NUMA node(s)" | awk '{print $3}')
if [ "$numa_nodes" -gt 1 ]; then
    echo "NUMA system detected with $numa_nodes nodes"
    lscpu | grep "NUMA node"
fi
```

### Virtualization Detection
```bash
# Check virtualization support
virtualization=$(lscpu | grep "Virtualization" | awk '{print $2}')
case "$virtualization" in
    "VT-x")
        echo "Intel VT-x virtualization supported"
        ;;
    "AMD-V")
        echo "AMD-V virtualization supported"
        ;;
    *)
        echo "No hardware virtualization detected"
        ;;
esac

# Check if running in a VM
if lscpu | grep -q "Hypervisor"; then
    hypervisor=$(lscpu | grep "Hypervisor vendor" | awk '{print $3}')
    echo "Running in virtual machine on $hypervisor"
else
    echo "Running on bare metal"
fi
```

### System Identification
```bash
# Generate system hardware fingerprint
cpu_model=$(lscpu | grep "Model name" | cut -d: -f2- | sed 's/^ *//')
cpu_cores=$(lscpu | grep "^CPU(s):" | awk '{print $2}')
cpu_cache=$(lscpu | grep "L3 cache" | awk '{print $3}')

echo "System ID: $cpu_model (${cpu_cores} cores, ${cpu_cache} cache)"

# Compare systems for compatibility
check_compatibility() {
    local system1=$1
    local system2=$2

    arch1=$(ssh $system1 "lscpu | grep Architecture | awk '{print \$2}'")
    arch2=$(ssh $system2 "lscpu | grep Architecture | awk '{print \$2}'")

    if [ "$arch1" = "$arch2" ]; then
        echo "Systems have compatible architecture: $arch1"
    else
        echo "Architecture mismatch: $arch1 vs $arch2"
    fi
}
```

### Cache Analysis
```bash
# Extract cache information for performance tuning
l1d_cache=$(lscpu | grep "L1d cache" | awk '{print $3}')
l1i_cache=$(lscpu | grep "L1i cache" | awk '{print $3}')
l2_cache=$(lscpu | grep "L2 cache" | awk '{print $3}')
l3_cache=$(lscpu | grep "L3 cache" | awk '{print $3}')

echo "Cache hierarchy:"
echo "  L1 Data:  $l1d_cache"
echo "  L1 Inst:  $l1i_cache"
echo "  L2:       $l2_cache"
echo "  L3:       $l3_cache"

# Calculate total cache size
total_l2_cache=$(($(echo $l2_cache | sed 's/K//') * $(lscpu | grep "^CPU(s):" | awk '{print $2}')))
echo "Total L2 cache: ${total_l2_cache}K"
```

### CPU Frequency Monitoring
```bash
# Check current and maximum CPU frequencies
current_mhz=$(lscpu | grep "CPU MHz" | awk '{print $3}')
max_mhz=$(lscpu | grep "CPU max MHz" | awk '{print $4}')

echo "Current CPU frequency: ${current_mhz} MHz"
echo "Maximum CPU frequency: ${max_mhz} MHz"

# Monitor frequency scaling
watch -n 1 "lscpu | grep 'CPU MHz'"
```

### Server Inventory
```bash
# Generate detailed CPU inventory report
generate_cpu_report() {
    echo "=== CPU Inventory Report ==="
    echo "Generated: $(date)"
    echo ""

    lscpu | grep -E "(Architecture|CPU op-mode|Byte Order)"
    lscpu | grep -E "(CPU\(s\)|Thread|Core|Socket|NUMA)"
    lscpu | grep -E "(Vendor|Model name|CPU family|Model)"
    lscpu | grep -E "(Stepping|CPU MHz|BogoMIPS)"
    lscpu | grep -E "(Virtualization|Hypervisor)"
    lscpu | grep -E "(L1|L2|L3)"
}

# Export to file
generate_cpu_report > /tmp/cpu_inventory_$(hostname).txt
```

## Advanced Usage

### CPU Affinity and NUMA
```bash
# Determine optimal CPU affinity masks
get_cpu_affinity_mask() {
    local socket=$1
    lscpu -e=cpu,socket | grep ",$socket$" | cut -d, -f1 | paste -sd, - | tr ',' '\n' | \
    awk 'BEGIN{printf "0x"} {printf "%x",$1}' | rev
}

# Get NUMA node CPU mapping
lscpu -e=cpu,node | sort -u -t, -k2
```

### Heterogeneous Computing (ARM big.LITTLE)
```bash
# Identify big vs little cores on ARM systems
lscpu -e=cpu,core,mhz | sort -n -t, -k3

# Check for different core types
core_types=$(lscpu -e=cpu,core | cut -d, -f2 | sort -u)
echo "Core types detected: $core_types"
```

### Cloud and Container Environments
```bash
# Detect cloud provider hypervisor
detect_cloud_provider() {
    if lscpu | grep -q "Hypervisor vendor"; then
        hypervisor=$(lscpu | grep "Hypervisor vendor" | awk '{print $3}')
        case "$hypervisor" in
            "KVM")
                echo "Likely running on OpenStack/Nova or similar KVM-based cloud"
                ;;
            "VMware")
                echo "Running on VMware vSphere/ESXi"
                ;;
            "Microsoft")
                echo "Running on Microsoft Azure/Hyper-V"
                ;;
            "Xen")
                echo "Running on Xen-based cloud (AWS, etc.)"
                ;;
        esac
    fi
}
```

### Performance Monitoring
```bash
# Baseline performance information
baseline_cpu_info() {
    echo "CPU Performance Baseline:"
    lscpu | grep -E "(Model name|CPU\(s\)|Thread|Core|Socket)"
    lscpu | grep -E "(CPU MHz|max MHz|min MHz)"
    lscpu | grep -E "(L1|L2|L3)"
}

# Check for CPU frequency scaling
check_scaling() {
    max_mhz=$(lscpu | grep "CPU max MHz" | awk '{print $4}')
    current_mhz=$(lscpu | grep "CPU MHz" | awk '{print $3}')

    if (( $(echo "$current_mhz < $max_mhz" | bc -l) )); then
        echo "CPU frequency scaling is active"
        echo "Current: $current_mhz MHz, Max: $max_mhz MHz"
    else
        echo "CPU running at maximum frequency: $current_mhz MHz"
    fi
}
```

## Output Fields Reference

### Extended Format (-e) Fields
- **CPU** - Logical CPU number
- **CORE** - Logical core number
- **SOCKET** - Logical socket number
- **NODE** - Logical NUMA node number
- **BOOK** - Logical book number (IBM Power Systems)
- **DRAWER** - Logical drawer number (IBM Power Systems)
- **CACHE** - Cache sharing information between CPUs
- **POLARIZATION** - CPU scheduling mode on virtual hardware
- **ADDRESS** - Physical address of the CPU
- **CONFIGURED** - Whether hypervisor has allocated the CPU
- **ONLINE** - Whether Linux is using the CPU
- **MAXMHZ** - Maximum CPU frequency
- **MINMHZ** - Minimum CPU frequency

### Parseable Format (-p) Fields
- **CPU** - CPU number
- **CORE** - Core number
- **SOCKET** - Socket number
- **NODE** - NUMA node number
- **MHZ** - Current frequency in MHz

## Related Commands

- [`top`](/docs/commands/system-monitoring/top) - Display running processes
- [`htop`](/docs/commands/system-monitoring/htop) - Interactive process viewer
- [`nproc`](/docs/commands/system/nproc) - Print number of processing units
- [`free`](/docs/commands/system-monitoring/free) - Display memory usage
- [`vmstat`](/docs/commands/system-monitoring/vmstat) - Report virtual memory statistics
- [`numactl`](/docs/commands/hardware/numactl) - Control NUMA policy
- [`cpufreq-info`](/docs/commands/hardware/cpufreq-info) - CPU frequency information

## Troubleshooting

### Common Issues

#### Command Not Found
```bash
# Install util-linux package
sudo apt-get install util-linux
sudo yum install util-linux
sudo dnf install util-linux

# Alternative: /proc/cpuinfo
cat /proc/cpuinfo
```

#### Incorrect CPU Count
```bash
# Verify with multiple sources
lscpu | grep "^CPU(s):"
nproc
cat /proc/cpuinfo | grep processor | wc -l

# Check if CPUs are online
lscpu -a  # Shows offline CPUs
lscpu -c  # Shows only offline CPUs
```

#### Missing Virtualization Information
```bash
# Check hardware virtualization support
grep -E '(vmx|svm)' /proc/cpuinfo

# Check kernel module support
lsmod | grep -i kvm
modprobe kvm_intel  # Intel
modprobe kvm_amd    # AMD
```

### Performance Analysis
```bash
# CPU utilization information
mpstat -P ALL 1 5

# CPU topology visualization
lstopo-no-graphics

# Detailed CPU frequency information
cpupower frequency-info

# NUMA information
numactl --hardware
```

## Best Practices

1. **Use `-e` flag** for detailed topology analysis
2. **Combine with `nproc`** for simple CPU count verification
3. **Check virtualization support** before setting up VMs
4. **Monitor CPU frequencies** for performance tuning
5. **Analyze NUMA topology** for memory-intensive applications
6. **Document CPU inventory** for system planning
7. **Use hex masks** for CPU affinity calculations

The `lscpu` command provides comprehensive CPU architecture information essential for system administration, performance tuning, and application optimization in Linux environments.