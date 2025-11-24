---
title: dmidecode - DMI Table Decoder
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dmidecode - DMI Table Decoder

The `dmidecode` command reads the DMI (Desktop Management Interface) table and displays system hardware information in a human-readable format. DMI data provides detailed information about the system's hardware components, including BIOS, motherboard, processor, memory, and other system components.

## Basic Syntax

```bash
dmidecode [options]
```

## Common Options

### Type Selection
- `-t, --type <type>` - Only display entries of specified type
- `-u, --dump` - Dump DMI data in hex format
- `-s, --string <keyword>` - Only display specified string value

### Output Options
- `-q, --quiet` - Be quiet (less verbose output)
- `-h, --help` - Display help message
- `-V, --version` - Display version information

### Input Options
- `-d, --dev-mem `` - Read memory from device file (default: /dev/mem)
- `--from-dump `` - Read DMI data from a binary file

### Dump Options
- `--dump-bin `` - Dump DMI data to a binary file

## Usage Examples

### Basic System Information
```bash
# Display all DMI information
dmidecode

# Typical output:
# dmidecode 3.2
Scanning /dev/mem for entry point.
SMBIOS 3.0.0 present.
45 structures occupying 2407 bytes.
Table at 0x000EB000.

Handle 0x0001, DMI type 1, 27 bytes
System Information
        Manufacturer: Dell Inc.
        Product Name: Latitude 7390
        Version: Not Specified
        Serial Number: ABCDEFG1
        UUID: 12345678-1234-1234-1234-123456789ABC
        Wake-up Type: Power Switch
        SKU Number: 0ABC1
        Family: Latitude
```

### BIOS Information
```bash
# Display BIOS information
dmidecode -t bios

# Or using type number
dmidecode -t 0

# Output example:
Handle 0x0000, DMI type 0, 24 bytes
BIOS Information
        Vendor: Dell Inc.
        Version: 1.2.3
        Release Date: 10/15/2018
        Address: 0xE0000
        Runtime Size: 128 kB
        ROM Size: 16 MB
        Characteristics:
                PCI is supported
                BIOS is upgradeable
                BIOS shadowing is allowed
                Boot from CD is supported
                Selectable boot is supported
                BIOS ROM is socketed
                EDD is supported
                5.25"/360 kB floppy services are supported (int 13h)
                5.25"/1.2 MB floppy services are supported (int 13h)
                3.5"/720 kB floppy services are supported (int 13h)
                3.5"/2.88 MB floppy services are supported (int 13h)
                Print screen service is supported (int 5h)
                8042 keyboard services are supported (int 9h)
                Serial services are supported (int 14h)
                Printer services are supported (int 17h)
                CGA/mono video services are supported (int 10h)
                ACPI is supported
                USB legacy is supported
                BIOS boot specification is supported
                Function key-initiated network boot is supported
                Targeted content distribution is supported
        BIOS Revision: 1.2
        Firmware Revision: 1.6
```

### System Information
```bash
# Display system information
dmidecode -t system
dmidecode -t 1

# Get specific system details
dmidecode -s system-manufacturer
dmidecode -s system-product-name
dmidecode -s system-version
dmidecode -s system-serial-number
dmidecode -s system-uuid
```

### Motherboard Information
```bash
# Display motherboard/baseboard information
dmidecode -t baseboard
dmidecode -t 2

# Output example:
Handle 0x0002, DMI type 2, 15 bytes
Base Board Information
        Manufacturer: Dell Inc.
        Product Name: 0TH15R
        Version: A00
        Serial Number: .FGHIJK2
        Asset Tag: Not Specified
        Features:
                Board is a hosting board
                Board is replaceable
        Location In Chassis: Not Specified
        Chassis Handle: 0x0003
        Type: Motherboard
        Contained Object Handles: 0
```

### Processor Information
```bash
# Display CPU information
dmidecode -t processor
dmidecode -t 4

# Get specific CPU details
dmidecode -s processor-family
dmidecode -s processor-manufacturer
dmidecode -s processor-version
dmidecode -s processor-frequency
```

### Memory Information
```bash
# Display memory device information
dmidecode -t memory
dmidecode -t 17

# Display memory array information
dmidecode -t 16

# Get memory count and type
dmidecode -t memory | grep "Size:" | grep -v "No Module"

# Check total memory capacity
dmidecode -t 16 | grep "Maximum Capacity"
```

## Practical Examples

### System Hardware Audit
```bash
# Generate comprehensive hardware audit
hardware_audit() {
    echo "=== System Hardware Audit ==="
    echo "Generated: $(date)"
    echo "Hostname: $(hostname)"
    echo ""

    echo "=== System Information ==="
    dmidecode -t system | grep -E "(Manufacturer|Product Name|Version|Serial Number|UUID)"
    echo ""

    echo "=== BIOS Information ==="
    dmidecode -t bios | grep -E "(Vendor|Version|Release Date)"
    echo ""

    echo "=== Base Board Information ==="
    dmidecode -t baseboard | grep -E "(Manufacturer|Product Name|Version|Serial Number)"
    echo ""

    echo "=== Processor Information ==="
    dmidecode -t processor | grep -E "(Socket Designation|Manufacturer|Version|Current Speed)"
    echo ""

    echo "=== Memory Information ==="
    echo "Memory Arrays:"
    dmidecode -t 16 | grep -E "(Maximum Capacity|Number of Devices)"
    echo "Memory Devices:"
    dmidecode -t 17 | grep -E "(Size|Form Factor|Type|Speed|Manufacturer|Serial Number)" | grep -v "No Module"
    echo ""

    echo "=== Chassis Information ==="
    dmidecode -t chassis | grep -E "(Type|Manufacturer|Version|Serial Number|Asset Tag)"
}

# Export audit to file
hardware_audit > /tmp/hardware_audit_$(hostname)_$(date +%Y%m%d).txt
```

### Memory Analysis
```bash
# Analyze memory configuration
analyze_memory() {
    echo "=== Memory Configuration Analysis ==="

    echo "Total Memory Arrays:"
    dmidecode -t 16 | grep -A 5 "Memory Array"

    echo ""
    echo "Installed Memory Modules:"
    dmidecode -t 17 | while read line; do
        if [[ "$line" =~ Size:.*MB|Size:.*GB ]]; then
            echo "$line"
            # Get next few lines for details
            for i in {1..5}; do
                read next_line
                echo "$next_line"
            done
            echo "---"
        fi
    done

    echo ""
    echo "Memory Speed Summary:"
    dmidecode -t 17 | grep "Speed:" | grep -v "Unknown" | sort | uniq -c

    echo ""
    echo "Memory Type Summary:"
    dmidecode -t 17 | grep "Type:" | grep -v "Unknown" | sort | uniq -c
}

# Check memory slots usage
check_memory_slots() {
    echo "=== Memory Slot Usage ==="
    total_slots=$(dmidecode -t 17 | grep "Memory Device" | wc -l)
    used_slots=$(dmidecode -t 17 | grep "Size: [0-9]" | wc -l)
    empty_slots=$((total_slots - used_slots))

    echo "Total memory slots: $total_slots"
    echo "Used slots: $used_slots"
    echo "Empty slots: $empty_slots"

    echo ""
    echo "Slot details:"
    dmidecode -t 17 | grep -A 1 "Memory Device" | grep -E "(Size:|Location:)"
}
```

### Asset Management
```bash
# Generate asset information report
generate_asset_report() {
    echo "=== Asset Management Report ==="
    echo "Report Date: $(date)"
    echo ""

    # System identifiers
    echo "System Identifiers:"
    echo "Manufacturer: $(dmidecode -s system-manufacturer)"
    echo "Product Name: $(dmidecode -s system-product-name)"
    echo "Serial Number: $(dmidecode -s system-serial-number)"
    echo "Asset Tag: $(dmidecode -t chassis | grep "Asset Tag" | cut -d: -f2- | sed 's/^ *//')"
    echo "UUID: $(dmidecode -s system-uuid)"
    echo ""

    # Hardware components
    echo "Hardware Components:"
    echo "CPU: $(dmidecode -s processor-version)"
    echo "Motherboard: $(dmidecode -s baseboard-manufacturer) $(dmidecode -s baseboard-product-name)"
    echo "BIOS: $(dmidecode -s bios-vendor) $(dmidecode -s bios-version)"
    echo ""

    # Memory configuration
    total_memory=0
    while IFS= read -r size; do
        if [[ "$size" =~ ([0-9]+) ]]; then
            total_memory=$((total_memory + ${BASH_REMATCH[1]}))
        fi
    done <<< "$(dmidecode -t 17 | grep "Size:" | grep -o '[0-9]*' | head -n -1)"

    echo "Memory Configuration:"
    echo "Total RAM: ${total_memory} MB"
    echo "Memory slots: $(dmidecode -t 17 | grep "Memory Device" | wc -l)"
    echo "Chassis Type: $(dmidecode -t chassis | grep "Type" | cut -d: -f2- | sed 's/^ *//')"
}

# Check warranty information (if available)
check_warranty_info() {
    echo "=== Warranty Information ==="
    echo "Manufacture Date: $(dmidecode -s bios-release-date)"
    echo "System Serial: $(dmidecode -s system-serial-number)"
    echo "Base Board Serial: $(dmidecode -s baseboard-serial-number)"
    echo "Chassis Serial: $(dmidecode -s chassis-serial-number)"
}
```

### System Compatibility Check
```bash
# Check hardware compatibility
check_compatibility() {
    echo "=== Hardware Compatibility Check ==="

    # Check virtualization support
    if dmidecode -t processor | grep -q "VT-x\|AMD-V"; then
        echo "✓ Hardware virtualization supported"
    else
        echo "✗ Hardware virtualization not supported"
    fi

    # Check for ECC memory support
    if dmidecode -t 16 | grep -q "ECC"; then
        echo "✓ ECC memory supported"
    else
        echo "✗ ECC memory not supported"
    fi

    # Check CPU architecture
    cpu_width=$(dmidecode -t processor | grep "Width:" | head -1 | cut -d: -f2 | sed 's/^ *//')
    echo "CPU Architecture: $cpu_width"

    # Check BIOS features
    if dmidecode -t bios | grep -q "ACPI is supported"; then
        echo "✓ ACPI supported"
    fi

    if dmidecode -t bios | grep -q "USB legacy is supported"; then
        echo "✓ USB legacy supported"
    fi
}
```

### Server Inventory Script
```bash
# Comprehensive server inventory
server_inventory() {
    local server_name=$1
    echo "=== Server Inventory: $server_name ==="
    echo "Date: $(date)"
    echo ""

    # Basic system info
    echo "System Information:"
    printf "%-20s: %s\n" "Manufacturer" "$(dmidecode -s system-manufacturer)"
    printf "%-20s: %s\n" "Product Name" "$(dmidecode -s system-product-name)"
    printf "%-20s: %s\n" "Serial Number" "$(dmidecode -s system-serial-number)"
    printf "%-20s: %s\n" "UUID" "$(dmidecode -s system-uuid)"
    echo ""

    # Chassis info
    echo "Chassis Information:"
    printf "%-20s: %s\n" "Chassis Type" "$(dmidecode -t chassis | grep "Type" | cut -d: -f2 | sed 's/^ *//')"
    printf "%-20s: %s\n" "Asset Tag" "$(dmidecode -t chassis | grep "Asset Tag" | cut -d: -f2 | sed 's/^ *//')"
    echo ""

    # CPU info
    echo "Processor Information:"
    cpu_count=$(dmidecode -t processor | grep "Socket Designation" | wc -l)
    printf "%-20s: %s\n" "CPU Count" "$cpu_count"
    printf "%-20s: %s\n" "CPU Model" "$(dmidecode -s processor-version)"
    printf "%-20s: %s\n" "CPU Speed" "$(dmidecode -s processor-frequency)"
    echo ""

    # Memory info
    echo "Memory Information:"
    total_capacity=$(dmidecode -t 16 | grep "Maximum Capacity" | awk '{print $3,$4}')
    printf "%-20s: %s\n" "Max Memory" "$total_capacity"

    used_capacity=$(dmidecode -t 17 | grep "Size: [0-9]" | awk '{sum += $2} END {print sum/1024 " GB"}')
    printf "%-20s: %s\n" "Used Memory" "$used_capacity"
    echo ""

    # Network interfaces (if available in DMI)
    echo "Network Information:"
    dmidecode -t network 2>/dev/null | grep -A 5 "Network" || echo "Network information not available in DMI"
}
```

### Troubleshooting DMI Issues
```bash
# Check DMI table validity
check_dmi_validity() {
    echo "=== DMI Table Validation ==="

    # Check if DMI is available
    if ! dmidecode >/dev/null 2>&1; then
        echo "Error: DMI not accessible or available"
        echo "Possible causes:"
        echo "  - Running in a virtual machine without DMI support"
        echo "  - Insufficient permissions (try with sudo)"
        echo "  - DMI not supported by hardware/BIOS"
        return 1
    fi

    echo "✓ DMI table is accessible"

    # Check SMBIOS version
    smbios_version=$(dmidecode | grep "SMBIOS" | awk '{print $2}')
    echo "SMBIOS Version: $smbios_version"

    # Check DMI structure count
    structure_count=$(dmidecode | grep "structures" | awk '{print $1}')
    echo "DMI Structures: $structure_count"

    # Check for common DMI types
    types_available=$(dmidecode | grep "DMI type" | awk '{print $3}' | sort -n | uniq | tr '\n' ' ')
    echo "Available DMI types: $types_available"
}

# Validate specific DMI data
validate_dmi_data() {
    echo "=== DMI Data Validation ==="

    # Check for empty critical fields
    critical_fields=(
        "system-manufacturer"
        "system-product-name"
        "bios-vendor"
        "processor-manufacturer"
    )

    for field in "${critical_fields[@]}"; do
        value=$(dmidecode -s "$field" 2>/dev/null)
        if [ -z "$value" ] || [ "$value" = "Not Specified" ]; then
            echo "⚠ Warning: $field is empty or not specified"
        else
            echo "✓ $field: $value"
        fi
    done
}
```

## Advanced Usage

### DMI Data Export
```bash
# Export DMI data to binary file
export_dmi_data() {
    local output_file=$1
    echo "Exporting DMI data to $output_file..."
    dmidecode --dump-bin "$output_file"
    echo "Export completed"
}

# Read DMI data from file
read_dmi_from_file() {
    local input_file=$1
    echo "Reading DMI data from $input_file..."
    dmidecode --from-dump "$input_file"
}
```

### Custom DMI Type Filtering
```bash
# List all available DMI types
list_dmi_types() {
    echo "=== Available DMI Types ==="
    dmidecode | grep "DMI type" | sort -n -k4 | while read line; do
        type_num=$(echo $line | grep -o "type [0-9]*" | cut -d' ' -f2)
        type_name=$(echo $line | cut -d, -f1 | cut -d' ' -f4-)
        printf "%3d - %s\n" "$type_num" "$type_name"
    done
}

# Filter by multiple types
filter_multiple_types() {
    local types=$1
    dmidecode -t "$types"
}
```

### System Identification
```bash
# Generate unique system fingerprint
generate_system_fingerprint() {
    echo "=== System Fingerprint ==="

    # Combine multiple DMI fields for unique identification
    fingerprint="$(
        dmidecode -s system-manufacturer
        dmidecode -s system-product-name
        dmidecode -s system-serial-number
        dmidecode -s baseboard-serial-number
        dmidecode -s bios-version
        dmidecode -s processor-version
    )"

    # Generate MD5 hash
    fingerprint_hash=$(echo "$fingerprint" | md5sum | cut -d' ' -f1)

    echo "System Fingerprint Hash: $fingerprint_hash"
    echo "Generated from: $(echo "$fingerprint" | wc -l) DMI fields"
}
```

## DMI Type Reference

### Common DMI Types
- **0** - BIOS Information
- **1** - System Information
- **2** - Base Board Information
- **3** - Chassis Information
- **4** - Processor Information
- **7** - Cache Information
- **8** - Port Connector Information
- **9** - System Slots Information
- **10** - On Board Devices Information
- **11** - OEM Strings
- **13** - BIOS Language Information
- **16** - Physical Memory Array
- **17** - Memory Device
- **19** - Memory Array Mapped Address
- **20** - Memory Device Mapped Address
- **24** - Hardware Security
- **25** - System Power Controls
- **27** - Cooling Device
- **32** - System Boot Information
- **41** - Onboard Devices Extended Information

### String Keywords
- **bios-vendor**, **bios-version**, **bios-release-date**
- **system-manufacturer**, **system-product-name**, **system-version**, **system-serial-number**, **system-uuid**
- **baseboard-manufacturer**, **baseboard-product-name**, **baseboard-version**, **baseboard-serial-number**
- **chassis-manufacturer**, **chassis-type**, **chassis-version**, **chassis-serial-number**
- **processor-family**, **processor-manufacturer**, **processor-version**, **processor-frequency**

## Related Commands

- [`lscpu`](/docs/commands/hardware/lscpu) - Display CPU information
- [`lshw`](/docs/commands/hardware/lshw) - List hardware configuration
- [`lspci`](/docs/commands/hardware/lspci) - List PCI devices
- [`dmidecode`](/docs/commands/hardware/dmidecode) - DMI table decoder
- [`free`](/docs/commands/system-monitoring/free) - Display memory usage
- [`cat /proc/meminfo`](/docs/commands/system/proc) - Memory information

## Troubleshooting

### Common Issues

#### Permission Denied
```bash
# dmidecode requires root privileges
sudo dmidecode

# Add user to appropriate group if supported
sudo usermod -a -G wheel $USER  # CentOS/RHEL
sudo usermod -a -G sudo $USER   # Ubuntu/Debian
```

#### DMI Not Available
```bash
# Check if running in virtual machine
dmesg | grep -i dmi
dmidecode 2>&1 | head -5

# Alternative information sources
cat /sys/class/dmi/id/product_name
cat /sys/class/dmi/id/sys_vendor
cat /sys/class/dmi/id/board_name
```

#### Virtual Machine Limitations
```bash
# In VMs, DMI might be limited or unavailable
# Try alternative commands:
sudo dmidecode -q  # Quiet mode

# Check what's available:
ls /sys/class/dmi/id/
```

### Data Validation
```bash
# Check for incomplete DMI data
check_dmi_completeness() {
    echo "Checking DMI data completeness..."

    # Check for critical missing information
    missing=0

    if [ "$(dmidecode -s system-manufacturer)" = "Not Specified" ]; then
        echo "Missing: System manufacturer"
        missing=$((missing + 1))
    fi

    if [ "$(dmidecode -s system-product-name)" = "Not Specified" ]; then
        echo "Missing: System product name"
        missing=$((missing + 1))
    fi

    echo "Total missing critical fields: $missing"
}
```

## Best Practices

1. **Run with `sudo`** for complete DMI access
2. **Use `-t`** to filter for specific information types
3. **Use `-s`** for scripting with specific string values
4. **Export with `--dump-bin`** for offline analysis
5. **Validate data** before using for critical decisions
6. **Document system UUIDs** for inventory management
7. **Check virtualization limitations** in VM environments
8. **Use `/sys/class/dmi/id/`** as alternative source for basic info

The `dmidecode` command provides comprehensive hardware information from DMI tables, essential for system inventory, troubleshooting, and hardware management in Linux environments.