---
title: init - System Initialization and Runlevel Control
sidebar_label: init
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# init - System Initialization and Runlevel Control

The `init` command is the parent of all processes on Unix-like systems and serves as the first process started during system boot. As process ID (PID) 1, it's responsible for bringing the system to the desired runlevel and managing system services throughout the system lifecycle. The init system reads initialization scripts from `/etc/inittab` (SysV init) or uses modern alternatives like systemd or Upstart to control system state, manage daemons, and handle system shutdown and reboot operations.

## Basic Syntax

```bash
init [RUNLEVEL]
init [OPTION]
```

## Runlevels

| Runlevel | Description | Typical Usage |
|----------|-------------|---------------|
| 0 | Halt/Shutdown | System power-off |
| 1 | Single-user mode | System maintenance, recovery |
| 2 | Multi-user mode (no networking) | Text mode, local services only |
| 3 | Multi-user mode (networking) | Full multi-user text mode |
| 4 | User-defined | Custom configuration |
| 5 | Multi-user mode (graphical) | Full desktop environment |
| 6 | Reboot | System restart |

## Common Options

### System Control Options
- `0` - Halt the system (shutdown)
- `1` or `S` or `s` - Enter single-user mode
- `2` - Enter multi-user mode without network
- `3` - Enter multi-user mode with network
- `4` - User-defined runlevel
- `5` - Enter graphical multi-user mode
- `6` - Reboot the system
- `q` or `Q` - Re-examine `/etc/inittab`

### Signal Options
- `-s, --single` - Boot into single-user mode
- `-b, --emergency` - Emergency shell mode
- `-z, --exit` - Exit init shell (single-user mode)

### System Information
- `-v, --version` - Display version information
- `-h, --help` - Display help message

## Usage Examples

### Basic Runlevel Management

#### Changing Runlevels
```bash
# Switch to single-user mode for maintenance
init 1

# Switch to multi-user text mode
init 3

# Switch to graphical mode
init 5

# Reboot the system
init 6

# Shutdown the system
init 0
```

#### Emergency and Recovery
```bash
# Enter emergency mode (systemd)
systemctl emergency

# Boot into rescue mode (systemd)
systemctl rescue

# Force single-user mode during boot
init s

# Emergency shell for system recovery
init -b
```

### System State Transitions

#### Maintenance Operations
```bash
# Enter maintenance mode
init 1

# After maintenance, return to normal operation
init 5

# Restart specific services in single-user mode
# Then return to multi-user mode
init 3
```

#### Service Management Integration
```bash
# Change runlevel and check services
init 3 && service --status-all

# Verify runlevel change
runlevel

# Check current system state
who -r

# Show active processes in current runlevel
ps aux
```

## Advanced Usage

### System Recovery and Diagnostics

#### Single-User Mode Operations
```bash
# Boot into single-user mode for system repair
init 1

# Mount filesystems read-write in single-user mode
mount -o remount,rw /

# Check filesystem integrity
fsck -f /dev/sda1

# Fix configuration issues
vi /etc/fstab

# Reset root password if needed
passwd root

# Return to multi-user mode after repairs
init 5
```

#### Emergency Recovery Scenarios
```bash
# Emergency mode for critical system issues
init -b

# Minimal system startup
init 1

# Debug system initialization
init -v 3

# Force re-read of inittab configuration
init q

# Check init system type
ps -p 1 -o comm=
```

### System Configuration

#### Inittab Management
```bash
# View current inittab configuration
cat /etc/inittab

# Check default runlevel
grep id: /etc/inittab

# Backup inittab before modifications
cp /etc/inittab /etc/inittab.backup

# Edit default runlevel (change id:5:initdefault: to id:3:initdefault:)
vi /etc/inittab

# Reload configuration without reboot
init q

# Verify syntax changes
init -t 5 q  # Test with timeout
```

#### Custom Runlevel Configuration
```bash
# Create custom runlevel scripts
mkdir -p /etc/rc.d/rc4.d

# Add custom startup scripts
ln -s /etc/init.d/myservice /etc/rc.d/rc4.d/S99myservice

# Configure custom services for specific runlevel
vi /etc/init.d/myservice

# Make script executable
chmod +x /etc/init.d/myservice

# Test custom runlevel
init 4
```

## Practical Examples

### System Administration

#### Scheduled Maintenance
```bash
#!/bin/bash
# Scheduled maintenance script

# Notify users before maintenance
wall "System maintenance in 5 minutes. Please save your work."

# Wait for users to log off
sleep 300

# Enter single-user mode
init 1

# Perform maintenance tasks
echo "Performing system maintenance..."

# Update packages
yum update -y

# Clean temporary files
rm -rf /tmp/*

# Check filesystem
fsck -f /dev/sda1

# Return to normal operation
init 5

# Notify users maintenance complete
wall "System maintenance complete. System is now available."
```

#### Service Recovery
```bash
#!/bin/bash
# Service recovery procedure

# Check system status
runlevel
service --status-all

# Enter maintenance mode
init 1

# Restart critical services
service network restart
service sshd restart

# Check system logs for errors
tail -f /var/log/messages

# Return to multi-user mode
init 3
```

### Boot Process Management

#### Custom Boot Sequences
```bash
# Boot with specific runlevel
# Add to kernel parameters: init=5

# Emergency boot with specific shell
# Add to kernel parameters: init=/bin/bash

# Debug boot process
# Add to kernel parameters: init=/sbin/init debug

# Single-user boot for recovery
# Add to kernel parameters: single or 1
```

#### Runlevel Diagnosis
```bash
# Check current runlevel
runlevel
who -r

# View init process details
ps -ef | grep init
pstree -p

# Check system startup time
systemd-analyze

# View service startup order
systemd-analyze critical-chain
```

## Integration with Modern Systems

### SystemD Integration

#### SystemD Runlevel Mapping
```bash
# Traditional runlevels to systemd targets
init 0 -> systemctl poweroff
init 1 -> systemctl isolate rescue.target
init 2 -> systemctl isolate multi-user.target
init 3 -> systemctl isolate multi-user.target
init 4 -> (custom target)
init 5 -> systemctl isolate graphical.target
init 6 -> systemctl reboot
```

#### SystemD Commands
```bash
# Equivalent systemd commands
systemctl isolate multi-user.target    # init 3
systemctl isolate graphical.target     # init 5
systemctl rescue                       # init 1
systemctl emergency                    # init -b
systemctl poweroff                     # init 0
systemctl reboot                       # init 6
```

### Service Management

#### SystemD Service Control
```bash
# Check current target
systemctl get-default

# Change default target
systemctl set-default graphical.target

# List active services
systemctl list-units --type=service

# Check failed services
systemctl --failed

# View service dependencies
systemctl list-dependencies graphical.target
```

## Troubleshooting

### Common Issues

#### Boot Failures
```bash
# System won't boot past init
# Solution: Boot into single-user mode
init 1

# Check filesystem integrity
fsck -y /dev/sda1

# Check init configuration
cat /etc/inittab

# Look for errors in boot logs
dmesg | grep -i error
journalctl -b -p err
```

#### Runlevel Problems
```bash
# System stuck in runlevel
# Check current state
who -r
ps aux | grep init

# Force runlevel change
init -t 10 3  # With timeout

# Check for stuck processes
ps aux | grep Z

# Kill zombie processes manually
kill -9 \${PID}
```

#### Service Init Failures
```bash
# Services not starting
# Check init scripts
ls -la /etc/rc.d/rc*.d/

# Test service manually
/etc/init.d/myservice start

# Check service status
service myservice status

# Enable service for runlevel
chkconfig --add myservice
chkconfig myservice on
```

### Recovery Procedures

#### System Recovery
```bash
# Boot into rescue mode from GRUB
# Select advanced options -> recovery mode

# Mount filesystems
mount -o remount,rw /

# Check and repair filesystem
fsck -f -y /dev/sda1

# Reset configuration if needed
cp /etc/inittab.backup /etc/inittab

# Restore system to working state
init 5
```

#### Password Recovery
```bash
# Boot into single-user mode
init 1

# Mount filesystems read-write
mount -o remount,rw /

# Reset root password
passwd root

# Sync and reboot
sync
init 6
```

## Security Considerations

### Single-User Mode Security
```bash
# Secure single-user mode with password
# Edit /etc/inittab to require authentication
~~:S:wait:/sbin/sulogin

# Configure boot loader password for single-user access
# GRUB configuration
password --md5 encrypted_password

# Limit physical access to console
# Disable single-user mode if not needed
# Comment out single-user entries in /etc/inittab
```

### Runlevel Restrictions
```bash
# Limit available runlevels
# Specify allowed runlevels in /etc/inittab
id:3:initdefault:

# Configure runlevel permissions
chmod 600 /etc/inittab

# Monitor runlevel changes
watch -n 5 'who -r'
```

## Performance Optimization

### Boot Performance
```bash
# Analyze boot process
systemd-analyze time

# Identify slow services
systemd-analyze blame

# Optimize service startup
systemctl disable unnecessary-service

# Parallel boot processing
# Enable in /etc/systemd/system.conf
DefaultDependencies=yes
```

### Service Startup Optimization
```bash
# Reduce boot time
# Disable unneeded services
systemctl disable bluetooth.service
systemctl disable cups.service

# Enable fast boot
# Configure in /etc/default/grub
GRUB_CMDLINE_LINUX="fastboot"

# Update GRUB
update-grub
```

## Related Commands

- [`telinit`](/docs/commands/system-service/telinit) - Tell init about runlevel changes
- [`runlevel`](/docs/commands/system-service/runlevel) - Display previous and current runlevel
- [`shutdown`](/docs/commands/system-service/shutdown) - Shutdown or restart the system
- [`reboot`](/docs/commands/system-service/reboot) - Reboot the system
- [`halt`](/docs/commands/system-service/halt) - Stop the system
- [`poweroff`](/docs/commands/system-service/poweroff) - Power off the system
- [`systemctl`](/docs/commands/system-service/systemctl) - Control systemd system and service manager
- [`service`](/docs/commands/system-service/service) - Run System V init scripts
- [`chkconfig`](/docs/commands/system-service/chkconfig) - Update and query runlevel information

## Best Practices

1. **Always notify users** before changing runlevels for maintenance
2. **Backup configuration** files before modifying `/etc/inittab`
3. **Test changes** in non-production environments first
4. **Use single-user mode** for system maintenance and recovery
5. **Monitor system state** during runlevel transitions
6. **Document custom runlevels** and their purposes
7. **Secure single-user access** with authentication when possible
8. **Use systemd commands** on modern systems instead of traditional init
9. **Check service dependencies** before changing runlevels
10. **Maintain runlevel consistency** across similar systems

## Performance Tips

1. **Minimize services** in lower runlevels for faster boot
2. **Use parallel startup** where supported
3. **Optimize service order** based on dependencies
4. **Disable unnecessary services** to improve startup time
5. **Use systemd-analyze** to identify boot bottlenecks
6. **Configure appropriate timeouts** for service startup
7. **Cache frequently used data** during initialization
8. **Use fast boot options** when available
9. **Minimize filesystem checks** during normal startup
10. **Optimize kernel parameters** for better init performance

The `init` command is fundamental to Linux system administration, providing the foundation for system initialization, service management, and operational state control. Understanding init and runlevel management is essential for effective system administration, troubleshooting, and maintenance of Unix-like systems.