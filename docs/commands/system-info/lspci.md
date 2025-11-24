---
title: lspci - List PCI Devices
sidebar_label: lspci
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lspci - List PCI Devices

The `lspci` command displays information about PCI (Peripheral Component Interconnect) buses and devices in the system. It's a fundamental tool for hardware inventory, device troubleshooting, driver configuration, and system administration in Linux environments.

## Basic Syntax

```bash
lspci [options]
```

## Common Options

### Display Options
- `-n` - Show numeric vendor and device codes
- `-nn` - Show both numeric and textual codes
- `-v` - Verbose output (more details)
- `-vv` - Very verbose output (even more details)
- `-vvv` - Extremely verbose output (maximum details)

### Format Options
- `-t` - Display devices in a tree format
- `-b` - Bus-centric view
- `-m` - Machine-readable output format
- `-D` - Always show domain numbers

### Selection Options
- `-s [[[[<domain>]:]<bus>]:][<slot>][.[<func>]]` - Show only specified device(s)
- `-d [<vendor>]:[<device>][:<class>[:<prog_if>]]` - Show only devices with specified IDs

### Information Options
- `-k` - Show kernel drivers handling each device
- `-i `` - Use specified ID database file
- `-x` - Show hex dump of the first 64 bytes of config space
- `-xxx` - Show hex dump of extended config space

### Utility Options
- `-h` - Display help message
- `-V` - Display version information
- `-q` - Be quiet (less verbose)
- `-M` - Enable bus mapping mode (for debugging)

## Usage Examples

### Basic Device Listing
```bash
# Show all PCI devices
lspci

# Typical output:
00:00.0 Host bridge: Intel Corporation 8th Gen Core Processor Host Bridge/DRAM Registers (rev 07)
00:01.0 PCI bridge: Intel Corporation 8th Gen Core Processor PCI Express Root Port 1 (rev 07)
00:02.0 VGA compatible controller: Intel Corporation UHD Graphics 620 (rev 07)
00:08.0 System peripheral: Intel Corporation Xeon E3-1200 v5/v6 / E3-1500 v5 / 6th/7th/8th Gen Core Processor Gaussian Mixture Model
00:12.0 Signal processing controller: Intel Corporation Cannon Lake PCH Thermal Controller (rev 10)
00:14.0 USB controller: Intel Corporation Cannon Lake PCH USB 3.1 xHCI Host Controller (rev 10)
00:14.2 RAM memory: Intel Corporation Cannon Lake PCH Shared SRAM (rev 10)
00:16.0 Communication controller: Intel Corporation Cannon Lake PCH HECI Controller (rev 10)
00:17.0 SATA controller: Intel Corporation Cannon Lake PCH SATA AHCI Controller (rev 10)
00:1d.0 PCI bridge: Intel Corporation Cannon Lake PCH PCI Express Root Port 9 (rev f0)
00:1d.4 PCI bridge: Intel Corporation Cannon Lake PCH PCI Express Root Port 13 (rev f0)
00:1f.0 ISA bridge: Intel Corporation HM470 Chipset LPC/eSPI Controller
00:1f.3 Audio device: Intel Corporation Cannon Lake PCH cAVS (rev 10)
00:1f.4 SMBus: Intel Corporation Cannon Lake PCH SMBus Controller (rev 10)
00:1f.6 Ethernet controller: Intel Corporation Ethernet Connection I219-LM
```

### Verbose Output
```bash
# Show detailed information about devices
lspci -v

# Show very detailed information
lspci -vv

# Show maximum details
lspci -vvv
```

### Tree Format
```bash
# Display devices in tree format
lspci -t

# Typical output:
-[0000:00]-+-00.0  Intel Corporation 8th Gen Core Processor Host Bridge/DRAM Registers
           +-01.0-[01]----00.0  NVIDIA Corporation GP107M [GeForce GTX 1050 Mobile]
           +-02.0  Intel Corporation UHD Graphics 620
           +-08.0  Intel Corporation Xeon E3-1200 v5/v6 / E3-1500 v5 / 6th/7th/8th Gen Core Processor Gaussian Mixture Model
           +-12.0  Intel Corporation Cannon Lake PCH Thermal Controller
           +-14.0  Intel Corporation Cannon Lake PCH USB 3.1 xHCI Host Controller
           +-14.2  Intel Corporation Cannon Lake PCH Shared SRAM
           +-16.0  Intel Corporation Cannon Lake PCH HECI Controller
           +-17.0  Intel Corporation Cannon Lake PCH SATA AHCI Controller
           +-1d.0-[02]----00.0  Intel Corporation Wireless 8265 / 8275
           +-1d.4-[03]--
           +-1f.0  Intel Corporation HM470 Chipset LPC/eSPI Controller
           +-1f.3  Intel Corporation Cannon Lake PCH cAVS
           +-1f.4  Intel Corporation Cannon Lake PCH SMBus Controller
           +-1f.6  Intel Corporation Ethernet Connection I219-LM
```

### Numeric Output
```bash
# Show numeric vendor/device codes
lspci -n

# Show both numeric and text codes
lspci -nn

# Output example:
00:00.0 0600: 8086:3ec1 (rev 07)
00:01.0 0604: 8086:3ec8 (rev 07)
00:02.0 0300: 8086:5917 (rev 07)
```

### Device Selection
```bash
# Show specific device
lspci -s 00:02.0

# Show all devices on a bus
lspci -s 00:

# Show devices by vendor
lspci -d 8086:  # Intel devices
lspci -d 10de:  # NVIDIA devices

# Show devices by class
lspci -d ::0300  # VGA controllers
lspci -d ::0200  # Ethernet controllers
lspci -d ::0101  # IDE controllers
```

### Kernel Driver Information
```bash
# Show kernel drivers for each device
lspci -k

# Output includes driver information:
00:02.0 VGA compatible controller: Intel Corporation UHD Graphics 620 (rev 07)
        Subsystem: Dell UHD Graphics 620
        Kernel driver in use: i915
        Kernel modules: i915

00:14.0 USB controller: Intel Corporation Cannon Lake PCH USB 3.1 xHCI Host Controller (rev 10)
        Subsystem: Dell Cannon Lake PCH USB 3.1 xHCI Host Controller
        Kernel driver in use: xhci_hcd
        Kernel modules: xhci_pci
```

## Practical Examples

### Hardware Inventory
```bash
# Generate complete hardware inventory
hardware_inventory() {
    echo "=== PCI Hardware Inventory ==="
    echo "Generated: $(date)"
    echo ""

    echo "System Summary:"
    lspci | wc -l && echo "PCI devices found"
    echo ""

    echo "Network Devices:"
    lspci | grep -i network
    lspci | grep -i ethernet
    echo ""

    echo "Graphics Devices:"
    lspci | grep -i vga
    lspci | grep -i display
    echo ""

    echo "Storage Controllers:"
    lspci | grep -i sata
    lspci | grep -i ide
    lspci | grep -i scsi
    lspci | grep -i nvme
    echo ""

    echo "USB Controllers:"
    lspci | grep -i usb
    echo ""

    echo "Audio Devices:"
    lspci | grep -i audio
    lspci | grep -i sound
}

# Export inventory to file
hardware_inventory > /tmp/pci_inventory_$(hostname)_$(date +%Y%m%d).txt
```

### Graphics Card Information
```bash
# Get detailed graphics card information
get_gpu_info() {
    echo "=== Graphics Card Information ==="
    lspci -v | grep -A 20 -i vga

    echo ""
    echo "GPU Drivers:"
    lspci -k | grep -A 2 -i vga

    echo ""
    echo "GPU Device IDs:"
    lspci -nn | grep -i vga
}

# Check for multiple GPUs
gpu_count=$(lspci | grep -i vga | wc -l)
if [ $gpu_count -gt 1 ]; then
    echo "Multiple GPUs detected:"
    lspci | grep -i vga
fi
```

### Network Device Identification
```bash
# Find all network devices
find_network_devices() {
    echo "=== Network Devices ==="
    lspci | grep -i -E "(network|ethernet|wireless|wifi)"

    echo ""
    echo "Detailed Network Device Info:"
    lspci -v | grep -A 10 -i -E "(network|ethernet|wireless)"

    echo ""
    echo "Network Device Drivers:"
    lspci -k | grep -A 3 -i -E "(network|ethernet|wireless)"
}

# Get specific device info
get_ethernet_info() {
    lspci -v | grep -A 15 -i ethernet
}

get_wireless_info() {
    lspci -v | grep -A 15 -i wireless
}
```

### Driver Troubleshooting
```bash
# Check which devices need drivers
check_missing_drivers() {
    echo "=== Devices Without Drivers ==="
    lspci -k | grep -B 1 -A 2 "Kernel driver in use:"
    lspci -k | grep -A 2 -B 1 "Kernel modules"

    echo ""
    echo "All devices and their driver status:"
    lspci -k | grep -E "(^[0-9a-f]+|Kernel driver|Kernel modules)"
}

# Check specific device driver
check_device_driver() {
    local device=$1
    echo "Driver information for $device:"
    lspci -k -s $device
}
```

### Device Configuration
```bash
# Get device configuration space
get_device_config() {
    local device=$1
    echo "Configuration space for $device:"
    lspci -xxx -s $device
}

# Show device capabilities
show_device_capabilities() {
    local device=$1
    echo "Capabilities for $device:"
    lspci -vv -s $device | grep -A 20 "Capabilities:"
}
```

### Virtual Machine Detection
```bash
# Check if running in virtual machine
detect_virtualization() {
    if lspci | grep -qi "virtualbox\|vmware\|qemu\|xen\|hyper-v"; then
        echo "Virtualization detected:"
        lspci | grep -i "virtualbox\|vmware\|qemu\|xen\|hyper-v"

        # Get more specific
        if lspci | grep -qi "virtualbox"; then
            echo "Running in VirtualBox"
        elif lspci | grep -qi "vmware"; then
            echo "Running in VMware"
        elif lspci | grep -qi "qemu"; then
            echo "Running in QEMU/KVM"
        fi
    else
        echo "Running on bare metal"
    fi
}
```

### Performance Analysis
```bash
# Check PCIe bus speed and width
check_pcie_performance() {
    echo "=== PCIe Performance Information ==="
    lspci -vv | grep -E "(LnkSta|LnkCap|Width|Speed)" | head -20

    echo ""
    echo "Current PCIe Link Status:"
    lspci -vv | grep -A 2 "LnkSta"
}

# Find devices on specific bus
find_bus_devices() {
    local bus=$1
    echo "Devices on bus $bus:"
    lspci | grep "^$bus:"
}
```

### Security and Audit
```bash
# Security audit of PCI devices
pci_security_audit() {
    echo "=== PCI Device Security Audit ==="
    echo "Date: $(date)"
    echo "Hostname: $(hostname)"
    echo ""

    echo "All PCI Devices:"
    lspci -nn | while read line; do
        device_id=$(echo $line | grep -o '\[....:....\]' | tr -d '[]')
        vendor_id=$(echo $device_id | cut -d: -f1)
        device_num=$(echo $device_id | cut -d: -f2)
        echo "Device ID: $device_id"
        echo "Vendor: $vendor_id, Device: $device_num"
        echo "Description: $line"
        echo "---"
    done
}
```

## Advanced Usage

### Device Vendor Identification
```bash
# Get vendor information
get_vendors() {
    lspci -n | awk '{print $3}' | sort | uniq | while read vendor; do
        echo "Vendor $vendor:"
        lspci -n | grep $vendor
        echo ""
    done
}

# Count devices by vendor
vendor_count() {
    lspci -n | awk '{print $3}' | sort | uniq -c | sort -nr
}
```

### Class-Based Filtering
```bash
# Devices by class
list_by_class() {
    local class=$1
    echo "Devices in class $class:"
    lspci -nn | grep " $class:"
}

# Common class searches
echo "Display controllers:"
lspci -d ::0300

echo "Network controllers:"
lspci -d ::0200

echo "USB controllers:"
lspci -d ::0c03

echo "Audio devices:"
lspci -d ::0403
```

### System Monitoring
```bash
# Monitor for PCI device changes
monitor_pci_changes() {
    lspci > /tmp/pci_before.txt

    echo "Monitoring PCI device changes... (Ctrl+C to stop)"
    while true; do
        sleep 5
        lspci > /tmp/pci_now.txt
        if ! diff /tmp/pci_before.txt /tmp/pci_now.txt >/dev/null; then
            echo "PCI device change detected at $(date):"
            diff /tmp/pci_before.txt /tmp/pci_now.txt
            cp /tmp/pci_now.txt /tmp/pci_before.txt
        fi
    done
}
```

## Output Fields Reference

### Device Address Format
- **Domain:Bus:Device.Function** - PCI device location
  - Domain: 0000 (usually)
  - Bus: 00 to ff
  - Device: 00 to 1f
  - Function: 0 to 7

### Device Classes
- **0x01** - Mass Storage Controller
- **0x02** - Network Controller
- **0x03** - Display Controller
- **0x04** - Multimedia Controller
- **0x05** - Memory Controller
- **0x06** - Bridge Device
- **0x07** - Communication Controller
- **0x08** - Generic System Peripheral
- **0x09** - Input Device
- **0x0a** - Docking Station
- **0x0b** - Processor
- **0x0c** - Serial Bus Controller
- **0x0d** - Wireless Controller
- **0x0e** - Intelligent I/O Controller
- **0x0f** - Satellite Communication Controller
- **0x10** - Encryption/Decryption Controller
- **0x11** - Signal Processing Controller
- **0x12** - Processing Accelerator

### Common Vendor IDs
- **8086** - Intel Corporation
- **10de** - NVIDIA Corporation
- **1002** - Advanced Micro Devices (AMD)
- **14e4** - Broadcom Corporation
- **196e** - NVIDIA Corporation ( newer devices)
- **1af4** - Red Hat, Inc. (QEMU virtual devices)

## Related Commands

- [`lsusb`](/docs/commands/hardware/lsusb) - List USB devices
- [`lspci`](/docs/commands/hardware/lspci) - List PCI devices
- [`lshw`](/docs/commands/hardware/lshw) - List hardware configuration
- [`dmidecode`](/docs/commands/hardware/dmidecode) - DMI table decoder
- [`setpci`](/docs/commands/hardware/setpci) - Configure PCI devices
- [`modprobe`](/docs/commands/system/modprobe) - Add/remove kernel modules

## Troubleshooting

### Common Issues

#### Command Not Found
```bash
# Install pciutils package
sudo apt-get install pciutils
sudo yum install pciutils
sudo dnf install pciutils
```

#### Permission Issues
```bash
# Most lspci operations don't require root
# But some detailed information might need sudo
sudo lspci -vvv
```

#### Missing Device Information
```bash
# Update PCI ID database
sudo update-pciids

# Check if PCI bus is accessible
lspci -v
```

### Device Problems
```bash
# Check for unassigned devices
lspci | grep -v "Kernel driver"

# Find devices with resource conflicts
lspci -v | grep -A 5 "Memory at"
```

## Best Practices

1. **Use `-nn`** for complete vendor/device information
2. **Use `-v` or `-vv`** for detailed troubleshooting
3. **Use `-k`** to check driver assignments
4. **Use `-t`** for understanding device hierarchy
5. **Regular hardware audits** using inventory scripts
6. **Document device IDs** for reference and troubleshooting
7. **Use `-s`** to focus on specific devices
8. **Update PCI ID database** regularly with `update-pciids`

The `lspci` command is essential for hardware management, providing comprehensive visibility into PCI devices and their configuration for system administration and troubleshooting.