---
title: lsusb - List USB Devices
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lsusb - List USB Devices

The `lsusb` command displays information about USB buses and devices connected to the system. It's a crucial tool for hardware inventory, device troubleshooting, driver debugging, and USB device management in Linux environments.

## Basic Syntax

```bash
lsusb [options]
```

## Common Options

### Display Options
- `-v` - Verbose output (show detailed information)
- `-vv` - Very verbose output (show maximum details)

### Device Selection
- `-s [[<bus>]:][<devnum>]` - Show only devices on specified bus and/or device number
- `-d [<vendor>]:[<product>]` - Show only devices with specified vendor and product IDs

### Format Options
- `-t` - Display devices in a tree format showing physical hierarchy
- `-V` - Show version information
- `-h` - Display help message

### Information Options
- `-D <device>` - Select device by device path (not bus number)

### Verbose Output Options
- `-v` - Show basic verbose information
- `-vv` - Show all available descriptors
- `-u` - Force use of the original binary USB descriptor parser

## Usage Examples

### Basic Device Listing
```bash
# Show all USB devices
lsusb

# Typical output:
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 002 Device 003: ID 04f2:b2ce Chicony Electronics Co., Ltd
Bus 002 Device 004: ID 8087:0a2a Intel Corp.
Bus 001 Device 003: ID 0c45:6706 Microdia
Bus 001 Device 002: ID 046d:c52b Logitech, Inc. Unifying Receiver
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

### Verbose Output
```bash
# Show detailed information about a device
lsusb -v

# Very verbose output for maximum details
lsusb -vv

# Example verbose output for a specific device:
Bus 001 Device 002: ID 046d:c52b Logitech, Inc. Unifying Receiver
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               2.00
  bDeviceClass            0 (Defined at Interface level)
  bDeviceSubClass         0
  bDeviceProtocol         0
  bMaxPacketSize0         8
  idVendor           0x046d Logitech, Inc.
  idProduct          0xc52b
  bcdDevice            24.01
  iManufacturer           1 Logitech
  iProduct                2 USB Unifying Receiver
  iSerial                 0
  bNumConfigurations      1
  Configuration Descriptor:
    bLength                 9
    bDescriptorType         2
    wTotalLength           84
    bNumInterfaces          3
    bConfigurationValue     1
    iConfiguration          0
    bmAttributes         0xa0
      (Bus Powered)
      Remote Wakeup
    MaxPower               98mA
```

### Tree Format
```bash
# Display USB devices in tree format
lsusb -t

# Typical output:
/:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/4p, 5000M
    |__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/4p, 5000M
        |__ Port 1: Dev 3, If 0, Class=Human Interface Device, Driver=usbhid, 5000M
/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/12p, 480M
    |__ Port 1: Dev 2, If 0, Class=Human Interface Device, Driver=usbhid, 480M
    |__ Port 1: Dev 2, If 1, Class=Human Interface Device, Driver=usbhid, 480M
    |__ Port 2: Dev 3, If 0, Class=Audio, Driver=snd-usb-audio, 480M
```

### Device Selection
```bash
# Show specific device
lsusb -s 001:002

# Show all devices on a specific bus
lsusb -s 001:

# Show devices by vendor ID
lsusb -d 046d:    # Logitech devices
lsusb -d 1d6b:    # Linux Foundation devices

# Show specific vendor/product combination
lsusb -d 046d:c52b  # Logitech Unifying Receiver
```

### Using Device Path
```bash
# Select device by path instead of bus number
lsusb -D /dev/bus/usb/001/002
```

## Practical Examples

### USB Device Inventory
```bash
# Generate complete USB device inventory
usb_inventory() {
    echo "=== USB Device Inventory ==="
    echo "Generated: $(date)"
    echo "Hostname: $(hostname)"
    echo ""

    echo "USB Buses and Devices:"
    lsusb
    echo ""

    echo "Device Count Summary:"
    echo "Total devices: $(lsusb | wc -l)"
    echo "USB 2.0 devices: $(lsusb | grep "1d6b:0002" | wc -l)"
    echo "USB 3.0 devices: $(lsusb | grep "1d6b:0003" | wc -l)"
    echo ""

    echo "External Devices:"
    lsusb | grep -v "Linux Foundation\|root hub"

    echo ""
    echo "Device Tree:"
    lsusb -t
}

# Export inventory to file
usb_inventory > /tmp/usb_inventory_$(hostname)_$(date +%Y%m%d).txt
```

### USB Mass Storage Devices
```bash
# Find USB storage devices
find_usb_storage() {
    echo "=== USB Storage Devices ==="
    lsusb | grep -i -E "(storage|mass|disk)"

    echo ""
    echo "Detailed storage device info:"
    lsusb -v | grep -A 10 -i -E "(storage|mass|disk)"
}

# Check USB storage performance
check_storage_performance() {
    echo "=== USB Storage Performance ==="

    # Find USB storage devices
    storage_devices=$(lsusb | grep -i storage)
    if [ -n "$storage_devices" ]; then
        echo "$storage_devices"

        # Check corresponding block devices
        for device in /dev/sd*; do
            if udevadm info --query=property --name=$device | grep -q "ID_BUS=usb"; then
                echo "Block device: $device"
                lsblk $device
            fi
        done
    else
        echo "No USB storage devices found"
    fi
}
```

### USB Input Devices
```bash
# Find USB input devices
find_input_devices() {
    echo "=== USB Input Devices ==="

    echo "Keyboards and Mice:"
    lsusb | grep -i -E "(keyboard|mouse|hid)"

    echo ""
    echo "HID Devices:"
    lsusb -v | grep -A 5 -i "Human Interface Device"

    echo ""
    echo "Input Device Details:"
    lsusb -t | grep -i input
}

# Check device properties
check_input_device() {
    local device=$1
    echo "Input device details for $device:"
    lsusb -v -s $device | grep -A 20 -i input
}
```

### USB Audio Devices
```bash
# Find USB audio devices
find_audio_devices() {
    echo "=== USB Audio Devices ==="

    lsusb | grep -i -E "(audio|sound)"

    echo ""
    echo "Audio Device Details:"
    lsusb -v | grep -A 10 -i "audio device"

    echo ""
    echo "Check ALSA USB devices:"
    aplay -l | grep -i usb
}

# List USB audio cards
list_usb_audio() {
    cat /proc/asound/cards | grep -i usb

    echo ""
    echo "USB audio devices in /proc/asound:"
    find /proc/asound -name "*usb*" -type l
}
```

### USB Network Devices
```bash
# Find USB network adapters
find_network_devices() {
    echo "=== USB Network Devices ==="

    lsusb | grep -i -E "(network|ethernet|wireless|wifi|lan)"

    echo ""
    echo "Network Device Details:"
    lsusb -v | grep -A 10 -i "ethernet\|wireless"

    echo ""
    echo "USB network interfaces:"
    ip link | grep -B 1 -i usb
}

# Get network device info
get_usb_network_info() {
    echo "USB network interfaces:"
    for iface in /sys/class/net/*; do
        if [ -e "$iface/device/uevent" ]; then
            if grep -q "ID_BUS=usb" "$iface/device/uevent" 2>/dev/null; then
                basename "$iface"
                udevadm info -a -p $(realpath "$iface") | grep -i usb
            fi
        fi
    done
}
```

### USB Serial Devices
```bash
# Find USB serial devices
find_serial_devices() {
    echo "=== USB Serial Devices ==="

    lsusb | grep -i -E "(serial|uart|ftdi|ch340|cp210)"

    echo ""
    echo "Serial device files:"
    ls -la /dev/ttyUSB* /dev/ttyACM* 2>/dev/null

    echo ""
    echo "Serial device details:"
    for device in /dev/ttyUSB* /dev/ttyACM*; do
        if [ -e "$device" ]; then
            echo "Device: $device"
            udevadm info -a -n $device | grep -A 5 -B 5 usb
        fi
    done
}
```

### Device Monitoring
```bash
# Monitor for USB device changes
monitor_usb_changes() {
    echo "Monitoring USB device changes... (Ctrl+C to stop)"

    lsusb > /tmp/usb_before.txt

    while true; do
        sleep 2
        lsusb > /tmp/usb_now.txt

        if ! diff /tmp/usb_before.txt /tmp/usb_now.txt >/dev/null; then
            echo "USB device change detected at $(date):"
            diff /tmp/usb_before.txt /tmp/usb_now.txt
            cp /tmp/usb_now.txt /tmp/usb_before.txt

            # Show device tree after change
            echo "Current USB tree:"
            lsusb -t
        fi
    done
}

# Real-time USB device monitoring
watch_usb_devices() {
    watch -n 1 "echo 'USB Devices: $(date)'; lsusb; echo ''; lsusb -t"
}
```

### Driver Information
```bash
# Check USB device drivers
check_usb_drivers() {
    echo "=== USB Device Drivers ==="

    echo "USB device driver assignments:"
    for device in /sys/bus/usb/devices/*/driver; do
        if [ -L "$device" ]; then
            dev_path=$(dirname "$device")
            dev_name=$(basename "$dev_path")
            driver_name=$(basename "$(readlink "$device")")
            echo "$dev_name: $driver_name"
        fi
    done

    echo ""
    echo "USB kernel modules:"
    lsmod | grep -i usb
}

# Check for driverless devices
check_driverless_devices() {
    echo "=== USB Devices Without Drivers ==="

    for device in /sys/bus/usb/devices/*; do
        if [ -f "$device/idVendor" ] && [ ! -L "$device/driver" ]; then
            vendor=$(cat "$device/idVendor" 2>/dev/null)
            product=$(cat "$device/idProduct" 2>/dev/null)
            echo "$(basename "$device"): $vendor:$product (no driver)"
        fi
    done
}
```

### USB Device Power Management
```bash
# Check USB power management
check_usb_power() {
    echo "=== USB Power Management ==="

    echo "USB power consumption:"
    for device in /sys/bus/usb/devices/*/power; do
        if [ -f "$device/control" ]; then
            dev_path=$(dirname "$device")
            dev_name=$(basename "$dev_path")
            control=$(cat "$device/control" 2>/dev/null)
            level=$(cat "$device/level" 2>/dev/null)
            autosuspend=$(cat "$device/autosuspend" 2>/dev/null)
            echo "$dev_name: control=$control, level=$level, autosuspend=$autosuspend"
        fi
    done
}
```

### USB Device Security
```bash
# USB security audit
usb_security_audit() {
    echo "=== USB Security Audit ==="
    echo "Date: $(date)"
    echo "Hostname: $(hostname)"
    echo ""

    echo "Connected USB Devices:"
    lsusb | while read line; do
        vendor=$(echo $line | awk '{print $6}' | cut -d: -f1)
        product=$(echo $line | awk '{print $6}' | cut -d: -f2)
        description=$(echo $line | cut -d: -f3- | sed 's/^ *//')

        echo "Device: $description"
        echo "Vendor ID: $vendor, Product ID: $product"

        # Check if it's a storage device
        if echo "$description" | grep -iq -E "(storage|disk|flash)"; then
            echo "WARNING: USB storage device detected"
        fi

        echo "---"
    done

    echo ""
    echo "USB Storage Devices in /dev:"
    ls -la /dev/sd* 2>/dev/null | grep usb || echo "No USB block devices found"
}
```

## Advanced Usage

### Device Capability Analysis
```bash
# Analyze USB device capabilities
analyze_device_capabilities() {
    local device=$1
    echo "=== Capabilities for device $device ==="

    lsusb -v -s $device | grep -A 20 -E "(bmAttributes|wMaxPacketSize|bcdUSB)"
}

# Check USB version support
check_usb_versions() {
    echo "=== USB Version Support ==="
    lsusb | grep "1d6b:" | while read line; do
        if echo $line | grep -q "0002"; then
            echo "USB 2.0 root hub: $line"
        elif echo $line | grep -q "0003"; then
            echo "USB 3.0 root hub: $line"
        fi
    done
}
```

### Device Authentication
```bash
# Check USB device authentication
check_device_auth() {
    echo "=== USB Device Authentication ==="

    for device in /sys/bus/usb/devices/*/authorized; do
        if [ -f "$device" ]; then
            dev_path=$(dirname "$device")
            dev_name=$(basename "$dev_path")
            authorized=$(cat "$device")
            echo "$dev_name: authorized=$authorized"
        fi
    done
}
```

## Output Reference

### Device Address Format
- **Bus:Device** - USB device location
  - Bus: 001 to 999
  - Device: 001 to 999

### Device ID Format
- **Vendor:Product** - USB vendor and product IDs
  - Vendor ID: 0001 to ffff
  - Product ID: 0001 to ffff

### Common USB Classes
- **01h** - Audio
- **02h** - Communications
- **03h** - Human Interface Device (HID)
- **05h** - Physical
- **06h** - Image
- **07h** - Printer
- **08h** - Mass Storage
- **09h** - Hub
- **0Ah** - CDC-Data
- **0Bh** - Smart Card
- **0Dh** - Content Security
- **0Eh** - Video
- **0Fh** - Personal Healthcare
- **10h** - Audio/Video
- **11h** - Billboard
- **DCh** - Diagnostic Device
- **E0h** - Wireless
- **EFh** - Miscellaneous
- **FEh** - Application Specific
- **FFh** - Vendor Specific

### Common USB Vendor IDs
- **1d6b** - Linux Foundation
- **046d** - Logitech
- **0781** - SanDisk
- **0951** - Kingston Technology
- **0bc2** - Seagate Technology
- **058f** - Alcor Micro Corp
- **090c** - Silicon Motion Inc.
- **148f** - Ralink Technology

## Related Commands

- [`lspci`](/docs/commands/hardware/lspci) - List PCI devices
- [`usb-devices`](/docs/commands/hardware/usb-devices) - Detailed USB device information
- [`udevadm`](/docs/commands/system/udevadm) - udev device manager
- [`dmesg`](/docs/commands/system-monitoring/dmesg) - Kernel ring buffer messages
- [`lsblk`](/docs/commands/hardware/lsblk) - List block devices

## Troubleshooting

### Common Issues

#### Command Not Found
```bash
# Install usbutils package
sudo apt-get install usbutils
sudo yum install usbutils
sudo dnf install usbutils
```

#### Device Not Detected
```bash
# Check kernel messages
dmesg | grep -i usb

# Check if USB bus is detected
ls -la /sys/bus/usb/devices/

# Rescan USB bus
echo 1 > /sys/bus/usb/rescan
```

#### Permission Denied
```bash
# Most lsusb operations don't require root
# For detailed verbose output, you might need sudo
sudo lsusb -vv

# Check user permissions for USB devices
groups | grep plugdev
```

#### Device Not Working
```bash
# Check if device is recognized
lsusb -v | grep -A 20 -i "error\|fail"

# Check driver binding
ls -la /sys/bus/usb/drivers/

# Force device re-enumeration
echo 1 > /sys/bus/usb/devices/1-1/remove
echo 1 > /sys/bus/usb/devices/1-1/bConfigurationValue
```

## Best Practices

1. **Use `lsusb -t`** to understand USB device hierarchy
2. **Use `lsusb -v`** for detailed troubleshooting information
3. **Check kernel messages** with `dmesg` when devices aren't detected
4. **Use vendor/product IDs** for device-specific scripting
5. **Monitor with `watch`** for real-time device detection
6. **Document device IDs** for configuration and automation
7. **Check driver bindings** when devices aren't working
8. **Use device-specific options** (`-s`, `-d`) for focused analysis

The `lsusb` command is essential for USB device management, providing comprehensive visibility into USB connectivity for hardware administration and troubleshooting.