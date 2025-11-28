---
title: depmod - Generate modules.dep and map files
sidebar_label: depmod
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# depmod - Generate modules.dep and map files

The `depmod` command is a essential Linux kernel utility that generates dependency files for kernel modules. It analyzes all kernel modules in a specified directory (typically `/lib/modules/$(uname -r)/`) and creates dependency mapping files that allow the kernel module loader to automatically load required dependencies when a module is requested. These dependency files are crucial for the Linux kernel's dynamic module loading system, ensuring that modules with interdependencies are loaded in the correct order. depmod creates several output files including `modules.dep`, `modules.dep.bin`, `modules.alias`, `modules.alias.bin`, `modules.symbols`, `modules.symbols.bin`, and `modules.devname`, which collectively form the foundation of Linux kernel module management.

## Basic Syntax

```bash
depmod [OPTIONS] [KERNEL_VERSION]
```

## Common Options

### General Options
- `-a, --all` - Probe all modules (default behavior)
- `-A, --quick` - Quick mode, only check timestamps
- `-n, --dry-run` - Print modules to stdout, don't write files
- `-v, --verbose` - Enable verbose output
- `-q, --quiet` - Suppress normal error messages
- `-h, --help` - Display help message
- `-V, --version` - Show version information

### Directory Options
- `-b, --basedir DIR` - Use DIR as filesystem root
- `-F, --force-modules-dir DIR` - Force modules directory
- `-e, --errsyms` - Report unresolved symbols
- `-E, --symvers` - Handle symbol versioning

### Kernel Version Options
- `KERNEL_VERSION` - Specify kernel version to process
- `--config FILE` - Override configuration file

## Usage Examples

### Basic Module Dependency Operations

#### Standard Dependency Generation
```bash
# Generate dependency files for current kernel
depmod

# Generate for specific kernel version
depmod 5.15.0-generic

# Quick mode - only if modules are newer than deps
depmod -A

# Verbose output showing progress
depmod -v

# Dry run - see what would be processed
depmod -n
```

#### Advanced Dependency Management
```bash
# Generate dependencies with error reporting for unresolved symbols
depmod -e

# Handle symbol versioning properly
depmod -E

# Quick mode with verbose output
depmod -Av

# Force regeneration of all dependency files
depmod -a

# Generate for custom kernel build
depmod /lib/modules/5.19.0-custom/
```

### System Administration

#### After Kernel Module Updates
```bash
# After installing new kernel modules
sudo apt install nvidia-driver-535
sudo depmod -a

# After building custom kernel modules
make && sudo make modules_install
sudo depmod -a

# After DKMS module updates
sudo dkms autoinstall
sudo depmod -a

# Check module dependencies before restart
sudo depmod -n | head -20
```

#### Troubleshooting Module Dependencies
```bash
# Check for unresolved symbols
sudo depmod -e 2>&1 | grep -i unresolved

# Generate dependencies with maximum verbosity
sudo depmod -vvv

# Check specific module dependencies
grep 'nvidia' /lib/modules/$(uname -r)/modules.dep

# Verify dependency files exist and are readable
ls -la /lib/modules/$(uname -r)/modules.dep*

# Check module aliases for devices
cat /lib/modules/$(uname -r)/modules.alias | grep -i pci
```

### Kernel Development and Customization

#### Custom Kernel Module Development
```bash
# After building external modules
make -C /lib/modules/$(uname -r)/build M=$PWD modules
sudo make -C /lib/modules/$(uname -r)/build M=$PWD modules_install
sudo depmod -a

# For out-of-tree module development
sudo depmod -b /path/to/chroot/ $(uname -r)

# Update dependencies for multiple kernel versions
for version in /lib/modules/*; do
    sudo depmod $(basename $version)
done

# Generate dependencies for custom kernel
sudo depmod 5.18.0-rc5-custom
```

#### Distribution Package Building
```bash
# In kernel package post-install script
KERNEL_VERSION=$1
depmod -a $KERNEL_VERSION

# For DKMS packages
dkms install -m nvidia -v 535.54.03 -k $(uname -r)
depmod -a

# When building kernel packages
fakeroot debian/rules binary-headers binary-generic
depmod -a
```

### Recovery and System Maintenance

#### System Recovery Scenarios
```bash
# Recovery chroot environment
sudo chroot /mnt/sda1
depmod -a

# After system crash with module corruption
sudo rm /lib/modules/$(uname -r)/modules.dep*
sudo depmod -a

# Check module system integrity
sudo depmod -n > /dev/null && echo "Dependencies OK" || echo "Dependency issues found"

# Update for all installed kernels
sudo update-grub
sudo depmod -a
```

#### Backup and Migration
```bash
# Backup module dependencies
sudo cp /lib/modules/$(uname -r)/modules.dep* /backup/

# Restore after system migration
sudo cp /backup/modules.dep* /lib/modules/$(uname -r)/
sudo depmod -A

# Generate for multiple kernel installations
for kernel in /lib/modules/*/; do
    version=$(basename $kernel)
    if [ -d "$kernel" ]; then
        echo "Updating dependencies for kernel $version"
        sudo depmod -a $version
    fi
done
```

## Practical Examples

### Hardware Driver Management

#### Graphics Drivers
```bash
# After NVIDIA driver installation
sudo apt install nvidia-driver-470
sudo depmod -a

# Verify nouveau module dependencies
modinfo nouveau | grep depends

# Check AMD GPU module dependencies
grep 'amdgpu' /lib/modules/$(uname -r)/modules.dep

# After Intel graphics driver update
sudo depmod -a && sudo update-initramfs -u
```

#### Network Drivers
```bash
# After wireless driver installation
sudo apt install firmware-iwlwifi
sudo depmod -a

# Check network module dependencies
modinfo iwlwifi | grep depends

# Update for custom network driver
sudo insmod custom_net_driver.ko
sudo depmod -a

# Verify virtualization network modules
grep 'virtio_net' /lib/modules/$(uname -r)/modules.dep
```

#### Storage Drivers
```bash
# After storage driver update
sudo apt install linux-modules-extra-$(uname -r)
sudo depmod -a

# Check RAID module dependencies
modinfo raid5 | grep depends

# Verify NVMe driver dependencies
grep 'nvme' /lib/modules/$(uname -r)/modules.dep

# After LVM module updates
sudo modprobe dm-mod
sudo depmod -a
```

### Virtualization and Container Management

#### Docker and Container Drivers
```bash
# After Docker installation
sudo apt install docker.io
sudo depmod -a

# Check container storage dependencies
modinfo overlay | grep depends

# Verify network namespace modules
grep 'netfilter' /lib/modules/$(uname -r)/modules.dep

# After Kata Containers installation
sudo apt install kata-containers
sudo depmod -a
```

#### Virtual Machine Drivers
```bash
# After KVM installation
sudo apt install qemu-kvm
sudo depmod -a

# Check virtualization modules
modprobe kvm_intel
sudo depmod -a

# Verify VirtIO drivers
grep 'virtio' /lib/modules/$(uname -r)/modules.dep

# After VirtualBox Guest Additions
sudo apt install virtualbox-guest-dkms
sudo depmod -a
```

## Advanced Usage

### Performance Optimization

#### Large Module Systems
```bash
# Use quick mode for frequent updates
depmod -A

# Parallel processing for large module trees
export DEPMOD_OPTIMIZATION=parallel
depmod -a

# Monitor dependency generation time
time depmod -a

# Check dependency file sizes
ls -lh /lib/modules/$(uname -r)/modules.dep*

# Optimize for SSD storage
sudo sysctl -w vm.vfs_cache_pressure=50
sudo depmod -a
```

#### Memory-Efficient Operations
```bash
# Low memory systems
depmod --quick

# Check memory usage during generation
/usr/bin/time -v depmod -a

# Process modules incrementally
find /lib/modules/$(uname -r)/ -name '*.ko' | \
    xargs -I {} sudo modinfo {} | grep depends

# Generate specific module dependencies
depmod -n | grep 'nvidia'
```

### Integration with System Tools

#### Automated Package Management
```bash
# In DKMS post-install script
#!/bin/bash
KERNEL_VERSION=$(uname -r)
depmod -a $KERNEL_VERSION

# For kernel package upgrades
#!/bin/sh
if [ "$1" = "configure" ]; then
    depmod -a
fi

# Module installation wrapper
install_module() {
    local module=$1
    sudo cp $module /lib/modules/$(uname -r)/
    sudo depmod -a
}
```

#### System Startup Integration
```bash
# Early boot dependency check
#!/bin/bash
if ! depmod -n > /dev/null 2>&1; then
    echo "Warning: Module dependency issues detected"
    logger "Module dependency check failed"
fi

# Service startup dependency
[Unit]
After=systemd-modules-load.service
ExecStart=/usr/sbin/depmod -A

# Cron job for periodic checks
0 2 * * * /usr/sbin/depmod -A && logger "Module dependencies updated"
```

## Troubleshooting

### Common Issues

#### Unresolved Symbol Errors
```bash
# Check for unresolved symbols
sudo depmod -e 2>&1 | grep -A5 -B5 "Unresolved"

# Find missing dependencies
modprobe -v module_name 2>&1 | grep -i unknown

# Check module version compatibility
modinfo module_name | grep vermagic

# Update all dependencies
sudo depmod -a && sudo update-initramfs -u

# Rebuild entire module dependency tree
sudo rm -f /lib/modules/$(uname -r)/modules.*
sudo depmod -a
```

#### Permission Issues
```bash
# Fix permission problems
sudo chown root:root /lib/modules/$(uname -r)/modules.*
sudo chmod 644 /lib/modules/$(uname -r)/modules.*

# Check module directory permissions
ls -la /lib/modules/

# Fix corrupted module files
sudo apt install --reinstall linux-modules-$(uname -r)
sudo depmod -a

# Rebuild from scratch
sudo rm -rf /lib/modules/$(uname -r)/
sudo apt install linux-image-$(uname -r)
```

#### Performance Issues
```bash
# Diagnose slow dependency generation
time depmod -v

# Check for excessive module count
find /lib/modules/$(uname -r)/ -name '*.ko' | wc -l

# Optimize file system cache
sudo echo 3 > /proc/sys/vm/drop_caches
depmod -a

# Use quick mode for frequent updates
depmod -A
```

## Related Commands

- [`modprobe`](/docs/commands/system-service/modprobe) - Load and unload kernel modules
- [`insmod`](/docs/commands/system-service/insmod) - Insert a module into the Linux Kernel
- [`rmmod`](/docs/commands/system-service/rmmod) - Remove a module from the Linux Kernel
- [`lsmod`](/docs/commands/system-service/lsmod) - List currently loaded kernel modules
- [`modinfo`](/docs/commands/system-service/modinfo) - Display information about a kernel module
- [`dmesg`](/docs/commands/system-service/dmesg) - Print kernel messages
- [`uname`](/docs/commands/system-service/uname) - Print system information
- [`update-initramfs`](/docs/commands/system-service/update-initramfs) - Update initramfs

## Best Practices

1. **Always run depmod after installing new modules** to ensure dependencies are current
2. **Use quick mode (-A) for routine updates** when only timestamps need checking
3. **Check for unresolved symbols (-e)** after major module updates
4. **Run depmod with verbose output (-v)** when troubleshooting dependency issues
5. **Backup dependency files before major system updates** to allow quick recovery
6. **Use dry run mode (-n)** to preview changes before committing them
7. **Run depmod for all installed kernels** after system-wide module updates
8. **Monitor dependency generation time** as an indicator of system module health
9. **Use basedir option (-b) when working in chroot environments**
10. **Integrate depmod calls into package post-install scripts** for automated updates

## Performance Tips

1. **Quick mode (-A)** is significantly faster for routine updates
2. **Parallel processing** can speed up dependency generation on large systems
3. **SSD storage** dramatically improves dependency file generation speed
4. **Avoid unnecessary full regenerations (-a)** when quick mode suffices
5. **Monitor file cache** performance for large module trees
6. **Use dry run mode** to validate changes before expensive operations
7. **Batch multiple module installations** before running depmod
8. **Keep module directories organized** to improve scan performance
9. **Regular cleanup** of unused modules reduces dependency generation time
10. **Use appropriate file system settings** for optimal module access patterns

The `depmod` command is a critical component of Linux kernel module management, ensuring that complex module interdependencies are properly resolved and documented. Its role in maintaining system stability and enabling dynamic kernel functionality makes it an essential tool for Linux system administration and kernel development.

---