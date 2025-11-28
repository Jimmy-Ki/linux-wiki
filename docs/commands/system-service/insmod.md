---
title: insmod - Insert module into Linux kernel
sidebar_label: insmod
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# insmod - Insert module into Linux kernel

The `insmod` command is a fundamental Linux utility used to insert kernel modules into the running Linux kernel. It allows system administrators and developers to load kernel modules dynamically without requiring a system reboot. The command takes compiled kernel object files (typically with `.ko` extension) and loads them into the kernel space, enabling additional functionality such as device drivers, file systems, network protocols, and system services. `insmod` is part of the kmod package and provides low-level module loading functionality, working in conjunction with other module management utilities like `modprobe`, `rmmod`, and `lsmod`.

## Basic Syntax

```bash
insmod [OPTIONS] filename [module parameters...]
```

## Common Options

### Basic Options
- `-h, --help` - Display help information and exit
- `-V, --version` - Show version information and exit
- `-v, --verbose` - Print verbose messages about module loading
- `-s, --syslog` - Output messages to syslog instead of stderr

### Module Loading Options
- `-f, --force` - Force module loading even if version doesn't match kernel
- `-q, --quiet` - Suppress error messages
- `-n, --dry-run` - Don't actually load the module, just check if it would load

### Parameters
- `filename` - Path to the kernel module file (.ko file)
- `module parameters` - Parameters to pass to the module (key=value format)

## Usage Examples

### Basic Module Loading

#### Loading Kernel Modules
```bash
# Load a simple kernel module
insmod /lib/modules/$(uname -r)/kernel/drivers/usb/storage/usb-storage.ko

# Load module with parameters
insmod my_module.ko param1=value1 param2=value2

# Load verbose output
insmod -v my_module.ko

# Load module with force flag (version mismatch)
insmod -f my_module.ko

# Dry run to check if module can be loaded
insmod -n my_module.ko
```

#### Common Driver Modules
```bash
# Load USB storage driver
insmod /lib/modules/$(uname -r)/kernel/drivers/usb/storage/usb-storage.ko

# Load network card driver
insmod /lib/modules/$(uname -r)/kernel/drivers/net/ethernet/intel/e1000e.ko

# Load sound module
insmod /lib/modules/$(uname -r)/kernel/sound/core/snd.ko

# Load virtualization module
insmod /lib/modules/$(uname -r)/kernel/drivers/kvm/kvm.ko

# Load file system module
insmod /lib/modules/$(uname -r)/kernel/fs/nfs/nfs.ko
```

### Module Loading with Parameters

#### Driver Configuration
```bash
# Load network driver with specific options
insmod e1000e.ko InterruptThrottleRate=3000 EEE=1

# Load USB driver with debugging enabled
insmod usb-storage.ko delay_use=1 quirks=0x80

# Load sound module with parameters
insmod snd-hda-intel.ko position_fix=1 enable_msi=1

# Load filesystem module with options
insmod nfs.ko nfs4_disable_idmapping=0 nfs3_acl_enable=1

# Load KVM module with nested virtualization
insmod kvm.ko nested=1
```

#### Custom Module Parameters
```bash
# Load custom module with configuration
insmod custom_driver.ko debug=1 buffer_size=1024 timeout=5000

# Load security module
insmod my_security.ko strict_mode=1 log_level=3

# Load monitoring module
insmod monitor.ko sampling_rate=1000 output_file=/var/log/monitor.log

# Load network filter module
insmod netfilter.ko default_policy=DROP log_packets=1

# Load storage module
insmod storage_filter.ko cache_size=64m max_concurrent=256
```

### Module Management

#### Module Status Checking
```bash
# Check if module is loaded after insmod
lsmod | grep my_module

# Check kernel log for module loading messages
dmesg | tail -10

# View module parameters after loading
cat /sys/module/my_module/parameters/*

# Check module dependencies
modinfo my_module.ko

# Verify module loaded successfully
cat /proc/modules | grep my_module
```

#### Module Validation
```bash
# Check module signature before loading
modinfo --field signer my_module.ko

# Verify module is for current kernel
modinfo --field vermagic my_module.ko

# Check module dependencies
modprobe --show-depends my_module.ko

# Validate module architecture
file my_module.ko

# Check module information
modinfo my_module.ko
```

## Practical Examples

### System Administration

#### Hardware Driver Management
```bash
# Load missing network driver
insmod /lib/modules/$(uname -r)/kernel/drivers/net/wireless/iwlwifi.ko

# Load USB device driver
insmod /lib/modules/$(uname -r)/kernel/drivers/usb/serial/usbserial.ko vendor=0x12d1 product=0x1001

# Load storage controller driver
insmod /lib/modules/$(uname -r)/kernel/drivers/scsi/scsi_mod.ko

# Load graphics driver
insmod /lib/modules/$(uname -r)/kernel/drivers/gpu/drm/i915.ko modeset=1

# Load audio driver
insmod /lib/modules/$(uname -r)/kernel/sound/pci/hda/snd-hda-codec-realtek.ko
```

#### Emergency Driver Loading
```bash
# Load network driver after kernel panic recovery
insmod -f e1000.ko

# Load storage driver for rescue system
insmod -q usb-storage.ko

# Load debugging module for troubleshooting
insmod -v debug-module.ko debug_level=3

# Load security module in emergency mode
insmod emergency-security.ko strict_enforcement=0

# Load filesystem module for mounting
insmod -v ext4.ko
```

### Development Workflow

#### Module Development
```bash
# Compile and load custom kernel module
make
insmod ./my_driver.ko

# Load development module with debug flags
insmod my_dev_driver.ko debug=1 verbose=1 test_mode=1

# Load module with test parameters
insmod test_module.ko unit_test=1 mock_hardware=1

# Load profiling module
insmod profiler.ko enabled=1 sample_rate=1000

# Load module with development configuration
insmod dev_module.ko dev_mode=1 log_level=DEBUG checkpoint=1
```

#### Module Testing
```bash
# Load module for testing
insmod test_module.ko test_suite=1

# Load module with testing parameters
insmod mock_driver.ko mock_device=1 test_data=1

# Load validation module
insmod validate.ko strict_check=1 report_errors=1

# Load performance testing module
insmod perf_test.ko benchmark=1 iterations=10000

# Load compatibility test module
insmod compat_test.ko kernel_version_test=1 api_check=1
```

### Production Environment

#### Production Module Loading
```bash
# Load production module with optimized settings
insmod prod_driver.ko opt_level=3 quiet=1

# Load module with production configuration
insmod server_module.ko production=1 monitoring=1

# Load high-availability module
insmod ha_module.ko failover=1 heartbeat=1

# Load cluster module
insmod cluster_module.ko node_id=$(hostname) cluster_mode=1

# Load monitoring module
insmod monitor.ko enabled=1 log_file=/var/log/monitor.log
```

#### Service Management
```bash
# Load service module with service parameters
insmod service_module.ko port=8080 max_connections=1000

# Load authentication module
insmod auth_module.ko ssl_enabled=1 token_timeout=3600

# Load database module
insmod db_module.ko connection_pool=50 query_cache=256m

# Load cache module
insmod cache_module.ko memory_limit=1g ttl=3600

# Load load balancer module
insmod lb_module.ko algorithm=round_robin health_check=1
```

## Advanced Usage

### Module Dependencies

#### Managing Dependencies
```bash
# Load module dependencies manually
insmod dependency1.ko
insmod dependency2.ko
insmod main_module.ko

# Load with dependency verification
modprobe --show-depends main_module.ko
insmod main_module.ko

# Load module chain
insmod core.ko
insmod protocol.ko
insmod driver.ko
insmod interface.ko

# Load all required modules
for mod in $(modprobe --show-depends target_module.ko | awk '{print $2}'); do
    insmod "$mod"
done

# Verify all dependencies loaded
lsmod | grep -E "(core|protocol|driver|interface)"
```

#### Module Stacking
```bash
# Load base module first
insmod base_module.ko

# Load extension module
insmod extension_module.ko base_param=enabled

# Load plugin module
insmod plugin.ko extension_id=1

# Verify module stack
cat /proc/modules | grep -E "(base_module|extension_module|plugin)"
```

### Module Configuration

#### Dynamic Configuration
```bash
# Load module with runtime configuration
insmod configurable.ko config_file=/etc/module/config.conf

# Load module with environment variables
MODULE_CONFIG=/etc/module/prod.conf insmod env_config.ko

# Load module with sysfs parameters
insmod sysfs_module.ko
echo 1000 > /sys/module/sysfs_module/parameters/timeout

# Load module with proc interface
insmod proc_module.ko
cat /proc/module_status
```

#### Persistent Module Loading
```bash
# Create systemd service for module loading
cat > /etc/systemd/system/load-my-module.service << 'EOF'
[Unit]
Description=Load custom kernel module
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/sbin/insmod /lib/modules/$(uname -r)/extra/my_module.ko
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
systemctl enable load-my-module.service
systemctl start load-my-module.service
```

### Security Considerations

#### Module Signing
```bash
# Check if module is properly signed
modinfo --field sig_key my_module.ko

# Load signed module
insmod signed_module.ko

# Verify module integrity
modinfo --field vermagic my_module.ko

# Check module hash
sha256sum my_module.ko

# Verify with known good hash
echo "expected_hash  my_module.ko" | sha256sum -c -
```

#### Secure Module Loading
```bash
# Load module with restricted permissions
chmod 600 my_module.ko
insmod my_module.ko

# Load module as root with verification
sudo insmod --verify my_module.ko

# Monitor module loading in logs
journalctl -f | grep "kernel.*insmod"

# Check module security attributes
getfattr -d my_module.ko
```

## Integration and Automation

### Shell Scripts

#### Automated Module Loading Script
```bash
#!/bin/bash
# Automated kernel module loader

MODULE_DIR="/lib/modules/$(uname -r)/extra"
LOG_FILE="/var/log/module_loader.log"
REQUIRED_MODULES=("driver1.ko" "driver2.ko" "service.ko")

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

load_module() {
    local module="$1"
    local module_path="$MODULE_DIR/$module"

    if [ ! -f "$module_path" ]; then
        log_message "ERROR: Module $module not found at $module_path"
        return 1
    fi

    if lsmod | grep -q "${module%.ko}"; then
        log_message "INFO: Module $module already loaded"
        return 0
    fi

    log_message "INFO: Loading module $module"
    if insmod -v "$module_path"; then
        log_message "SUCCESS: Module $module loaded successfully"
        return 0
    else
        log_message "ERROR: Failed to load module $module"
        return 1
    fi
}

# Load all required modules
for module in "${REQUIRED_MODULES[@]}"; do
    load_module "$module" || exit 1
done

log_message "INFO: All modules loaded successfully"
exit 0
```

#### Module Health Check Script
```bash
#!/bin/bash
# Module health monitoring

MONITOR_MODULES=("network_driver" "storage_driver" "security_module")
HEALTH_CHECK_INTERVAL=60

check_module_health() {
    local module="$1"

    if ! lsmod | grep -q "$module"; then
        echo "ERROR: Module $module is not loaded"
        return 1
    fi

    if [ -d "/sys/module/$module" ]; then
        local status=$(cat "/sys/module/$module/refcnt" 2>/dev/null)
        echo "INFO: Module $module is loaded with reference count: $status"
        return 0
    fi

    echo "WARNING: Module $module sysfs interface not available"
    return 1
}

while true; do
    echo "=== Module Health Check $(date) ==="

    for module in "${MONITOR_MODULES[@]}"; do
        check_module_health "$module"
    done

    sleep $HEALTH_CHECK_INTERVAL
done
```

### System Integration

#### Module Loading at Boot
```bash
# Add modules to load at boot
echo "my_module" > /etc/modules-load.d/my-module.conf

# Create module configuration
cat > /etc/modprobe.d/my-module.conf << 'EOF'
# Module configuration
options my_module param1=value1 param2=value2
install my_module /usr/sbin/insmod /lib/modules/$(uname -r)/extra/my_module.ko
EOF

# Update initramfs to include modules
update-initramfs -u -k $(uname -r)
```

#### Module Removal and Reloading
```bash
# Safe module reload
reload_module() {
    local module="$1"

    if lsmod | grep -q "${module%.ko}"; then
        rmmod "${module%.ko}"
        sleep 1
    fi

    insmod "$module"
}

# Reload all modules in directory
reload_all_modules() {
    for module in /lib/modules/$(uname -r)/extra/*.ko; do
        reload_module "$module"
    done
}
```

## Troubleshooting

### Common Issues

#### Module Loading Failures
```bash
# Check kernel version compatibility
uname -r
modinfo --field vermagic my_module.ko

# Check for dependency issues
modinfo my_module.ko
modprobe --show-depends my_module.ko

# Check module signature verification
dmesg | grep -i "module.*signature"

# Check for missing symbols
dmesg | grep -i "unknown symbol"

# Check kernel log for loading errors
dmesg | tail -20
```

#### Version Mismatch Issues
```bash
# Force load module with version mismatch (caution!)
insmod -f my_module.ko

# Check kernel build version
cat /proc/version

# Check module build version
modinfo --field vermagic my_module.ko

# Recompile module for current kernel
cd /path/to/module/source
make clean
make
```

#### Permission Issues
```bash
# Check if running as root
id -u

# Check file permissions
ls -la my_module.ko

# Set proper permissions
chmod 600 my_module.ko
chown root:root my_module.ko

# Check secure boot status
mokutil --sb-state

# Disable secure boot to load unsigned modules (not recommended)
# This requires BIOS access and is system-specific
```

#### System Lockups
```bash
# Load module in recovery mode
insmod -v -n my_module.ko  # Dry run first
insmod -v my_module.ko

# Monitor system health after loading
top
iostat 1
dmesg -w

# Prepare recovery script
cat > /usr/local/bin/recovery.sh << 'EOF'
#!/bin/bash
# Emergency recovery script
rmmod problem_module
systemctl restart critical_service
EOF

chmod +x /usr/local/bin/recovery.sh
```

## Related Commands

- [`modprobe`](/docs/commands/system-service/modprobe) - Load kernel modules with dependency resolution
- [`rmmod`](/docs/commands/system-service/rmmod) - Remove kernel modules from memory
- [`lsmod`](/docs/commands/system-info/lsmod) - List currently loaded kernel modules
- [`modinfo`](/docs/commands/system-info/modinfo) - Display information about kernel modules
- [`depmod`](/docs/commands/system-service/depmod) - Generate module dependency information
- [`systemctl`](/docs/commands/system-service/systemctl) - Systemd service manager for module services
- [`dmesg`](/docs/commands/user-management/dmesg) - Display kernel ring buffer messages
- [`uname`](/docs/commands/system-info/uname) - Print system information including kernel version

## Best Practices

1. **Always check module dependencies** before loading to avoid symbol resolution errors
2. **Use `modprobe` instead of `insmod`** when possible for automatic dependency resolution
3. **Verify module compatibility** with current kernel version before loading
4. **Monitor system logs** (`dmesg`) after loading new modules
5. **Test in development environment** before deploying to production systems
6. **Document module parameters** and their effects for future reference
7. **Implement proper error handling** in scripts that use `insmod`
8. **Keep module backups** in case rollback is needed
9. **Use appropriate permissions** and avoid loading modules as non-root user
10. **Consider secure boot implications** when loading unsigned modules

## Performance Tips

1. **Load modules at system boot** to reduce runtime overhead
2. **Optimize module parameters** based on system requirements
3. **Monitor module memory usage** after loading with `/proc/modules`
4. **Use `lsmod` reference counts** to understand module usage patterns
5. **Avoid unnecessary module reloading** as it can cause system instability
6. **Batch load related modules** to reduce initialization overhead
7. **Use `modprobe` for dependency resolution** instead of manual loading with `insmod`
8. **Consider compiled-in modules** instead of loadable modules for critical functionality
9. **Profile module performance** after loading to identify bottlenecks
10. **Use dry-run mode** (`-n`) to test module loading without actual insertion

The `insmod` command is a fundamental tool for Linux kernel module management, providing direct control over module loading without dependency resolution. While simpler than `modprobe`, it offers precise control for system administrators and developers who need to manually manage kernel modules, making it essential for kernel development, hardware driver management, and system customization scenarios.