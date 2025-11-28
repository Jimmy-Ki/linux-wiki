---
title: halt - System Halt Command
sidebar_label: halt
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# halt - System Halt Command

The `halt` command is a fundamental system administration utility used to shut down the Linux system and halt the CPU. It is part of the `util-linux` package and provides a clean way to stop system operations, sync filesystems, and bring the machine to a state where it can be safely powered off. Halt works by sending appropriate signals to the init system (System V init or systemd) to perform an orderly system shutdown, ensuring all processes are terminated gracefully and all filesystems are unmounted properly. The command is typically used for system maintenance, emergency shutdowns, and automated shutdown procedures.

## Basic Syntax

```bash
halt [OPTIONS]
```

## Common Options

### Shutdown Control
- `-p, --poweroff` - Power off the system after halting
- `-r, --reboot` - Reboot the system after halting
- `-f, --force` - Force immediate halt without shutting down gracefully
- `-w, --wtmp-only` - Only write the wtmp record, don't actually halt
- `-n, --no-sync` - Don't sync filesystems before halting

### Timing and Behavior
- `-d, --no-wtmp` - Don't write the wtmp shutdown record
- `-h, --halt` - Halt the system (default behavior)
- `-c, --no-wall` - Don't send wall messages before shutting down

### System V init Options
- `-q, --quiet` - Reduce output messages
- `-v, --verbose` - Enable verbose output
- `--help` - Display help information
- `--version` - Show version information

## Usage Examples

### Basic System Halt Operations

#### Simple System Halt
```bash
# Basic system halt
halt

# Halt with power off
halt -p

# Halt and reboot
halt -r

# Verbose halt output
halt -v
```

#### Emergency System Control
```bash
# Force immediate halt (emergency use only)
halt -f

# Halt without syncing filesystems (dangerous)
halt -n

# Halt without wtmp record
halt -d

# Only write shutdown record without actual halt
halt -w
```

### System Maintenance Procedures

#### Clean System Shutdown
```bash
# Standard halt with logging
sudo halt -p -v

# Halt without wall messages (for automated scripts)
sudo halt -p -c

# Emergency halt when system is unresponsive
sudo halt -f -n
```

#### Testing and Debugging
```bash
# Test halt without actually shutting down
halt -w

# Halt with minimal output for cron jobs
halt -p -q

# Show halt version and help
halt --version
halt --help
```

## Practical Examples

### System Administration

#### Scheduled System Maintenance
```bash
#!/bin/bash
# System maintenance shutdown script

echo "Starting system maintenance shutdown..."
echo "This will halt the system in 60 seconds."

# Schedule halt with proper logging
logger "System maintenance shutdown initiated at $(date)"

# Perform pre-shutdown tasks
sync
sync
sync

# Halt with verbose output
halt -p -v
```

#### Emergency Recovery Procedures
```bash
#!/bin/bash
# Emergency system recovery script

echo "Emergency recovery initiated..."
logger "Emergency halt requested at $(date)"

# Force halt when system is compromised
halt -f -n

# Alternative: Safe halt when possible
# halt -p -v -c
```

#### Automated Shutdown Procedures
```bash
#!/bin/bash
# Automated shutdown for power failure

POWER_STATUS=$(cat /sys/class/power_supply/AC/online)

if [ "$POWER_STATUS" -eq 0 ]; then
    echo "AC power lost, initiating emergency shutdown..."
    logger "Emergency shutdown due to power loss"

    # Clean shutdown with minimal messages
    halt -p -c
fi
```

### Remote System Management

#### Remote System Halt
```bash
# Remote halt via SSH
ssh root@remote-server "halt -p"

# Remote halt with specific timing
ssh root@remote-server "echo 'System halting in 5 minutes' && sleep 300 && halt -p"

# Remote force halt for emergency
ssh root@remote-server "halt -f"
```

#### Batch System Management
```bash
#!/bin/bash
# Batch halt multiple servers

SERVERS=("server1" "server2" "server3")

for server in "${SERVERS[@]}"; do
    echo "Halting $server..."
    ssh root@$server "halt -p -c" &
    sleep 30
done

echo "All servers scheduled for halt"
```

## Advanced Usage

### System Recovery and Troubleshooting

#### System Recovery Mode
```bash
# Halt to enter recovery mode
halt -p -v

# Force halt when normal shutdown fails
halt -f

# Halt without filesystem sync (last resort)
halt -n -f
```

#### Diagnostic Procedures
```bash
# Test halt command functionality
halt -w

# Check halt command version compatibility
halt --version

# Display all halt options
halt --help
```

### Integration with System Scripts

#### Custom Shutdown Scripts
```bash
#!/bin/bash
# Custom shutdown procedure

# Function to perform pre-shutdown tasks
pre_shutdown_tasks() {
    echo "Running pre-shutdown tasks..."

    # Stop critical services
    systemctl stop nginx.service
    systemctl stop mysql.service
    systemctl stop apache2.service

    # Sync filesystems
    sync

    # Write shutdown log
    logger "Custom shutdown completed at $(date)"
}

# Execute tasks then halt
pre_shutdown_tasks
halt -p -v
```

#### System State Check
```bash
#!/bin/bash
# System health check before halt

# Check critical processes
if pgrep -x "critical_process" > /dev/null; then
    echo "Critical process running, aborting halt"
    exit 1
fi

# Check system load
LOAD=$(uptime | awk -F'load average:' '{ print $2 }' | awk '{ print $1 }' | sed 's/,//')

if (( $(echo "$LOAD > 5.0" | bc -l) )); then
    echo "High system load ($LOAD), consider waiting"
    read -p "Continue with halt? (y/N): " confirm
    [[ $confirm != [yY] ]] && exit 1
fi

echo "Proceeding with system halt"
halt -p
```

## Integration and Automation

### System Monitoring Integration

#### Monitoring-Based Shutdown
```bash
#!/bin/bash
# Automatic shutdown based on system metrics

# Check CPU temperature
TEMP=$(sensors | grep 'Core 0' | awk '{print $3}' | sed 's/+//; s/°C//')

if (( $(echo "$TEMP > 80.0" | bc -l) )); then
    logger "High temperature detected ($TEMP°C), initiating emergency halt"
    halt -f
fi

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')

if [ "$DISK_USAGE" -gt 95 ]; then
    logger "Disk critically full ($DISK_USAGE%), halting system"
    halt -p -c
fi
```

#### Log-Based Shutdown Triggers
```bash
#!/bin/bash
# Shutdown based on critical log events

# Monitor for critical errors
if journalctl -p emerg --since "1 hour ago" | grep -q "CRITICAL"; then
    logger "Critical error detected, initiating safe shutdown"
    halt -p -v
fi

# Check for hardware errors
if dmesg | grep -q "Hardware Error"; then
    logger "Hardware error detected, forcing shutdown"
    halt -f
fi
```

### Cron Job Integration

#### Scheduled System Halt
```bash
# Add to crontab for daily shutdown
# 0 2 * * * /usr/local/bin/daily_shutdown.sh

#!/bin/bash
# Daily shutdown script

BACKUP_COMPLETE_FLAG="/tmp/backup_complete"

if [ -f "$BACKUP_COMPLETE_FLAG" ]; then
    logger "Daily backup complete, halting system"
    halt -p -c
else
    logger "Backup not complete, skipping shutdown"
fi
```

#### Conditional Shutdown
```bash
#!/bin/bash
# Conditional shutdown based on system state

# Check if users are logged in
USERS_COUNT=$(who | wc -l)

if [ "$USERS_COUNT" -eq 0 ]; then
    # Check for active processes
    ACTIVE_PROCESSES=$(ps aux | grep -v "\[" | wc -l)

    if [ "$ACTIVE_PROCESSES" -lt 10 ]; then
        logger "System idle, halting for energy saving"
        halt -p -c
    fi
fi
```

## Troubleshooting

### Common Issues

#### Permission Denied Errors
```bash
# Halt requires root privileges
# Solution: Use sudo or run as root
sudo halt -p

# Check if user has shutdown privileges
# Add user to shutdown group or use sudoers configuration
```

#### Halt Command Not Found
```bash
# Install halt command (part of util-linux)
# Ubuntu/Debian:
sudo apt-get install util-linux

# RHEL/CentOS:
sudo yum install util-linux

# Arch Linux:
sudo pacman -S util-linux
```

#### System Doesn't Power Off
```bash
# Try with poweroff option explicitly
sudo halt -p

# Alternative: Use poweroff command
sudo poweroff

# Check ACPI support
ls /proc/acpi
dmesg | grep -i acpi
```

#### Hanging During Halt
```bash
# Force halt for unresponsive system
sudo halt -f

# Check for problematic services
systemctl list-units --state=running

# Stop specific services before halt
sudo systemctl stop problem-service
```

### Debugging Halt Issues

#### Verbose Halt Output
```bash
# Get detailed information about halt process
sudo halt -v

# Check system logs for shutdown issues
journalctl -b -1 | grep -i halt
journalctl -b -1 | grep -i shutdown

# Check wtmp records
last shutdown | head -10
```

#### Testing Halt Behavior
```bash
# Test halt without actually shutting down
sudo halt -w

# Check wtmp record was written
last shutdown | head -1

# Test with dry run where supported
# Some systems support --dry-run option
sudo halt --help | grep dry
```

## Best Practices

1. **Use with sudo** - Halt requires root privileges for security
2. **Check for active users** - Verify no users are logged in before halting
3. **Save important work** - Ensure all data is saved before halting
4. **Monitor system load** - Avoid halting during high system activity
5. **Use verbose mode** - Enable verbose output for debugging shutdown issues
6. **Log shutdown actions** - Keep records of system shutdowns for auditing
7. **Test emergency procedures** - Practice emergency halt procedures for critical situations
8. **Check dependencies** - Ensure critical services can handle unexpected halts
9. **Document procedures** - Maintain clear documentation of shutdown procedures
10. **Use alternatives appropriately** - Consider `shutdown` for scheduled halts with warnings

## Performance Tips

1. **Use `-p` for complete poweroff** when you want the system to turn off completely
2. **Avoid `-f` except in emergencies** as it can cause data loss
3. **Use `-c` in automation** to prevent wall messages in scripted environments
4. **Monitor filesystem sync** with `sync` command before halting critical systems
5. **Check ACPI support** if system doesn't power off completely after halt
6. **Use `poweroff`** instead of `halt -p` for better compatibility on some systems
7. **Consider `shutdown`** for timed shutdowns with user notifications
8. **Test on development systems** before implementing halt in production environments

## Related Commands

- [`shutdown`](/docs/commands/system-service/shutdown) - Schedule system shutdown with warnings
- [`poweroff`](/docs/commands/system-service/poweroff) - Power off the system
- [`reboot`](/docs/commands/system-service/reboot) - Reboot the system
- [`systemctl`](/docs/commands/system-service/systemctl) - System and service manager
- [`init`](/docs/commands/system-service/init) - System initialization process
- [`telinit`](/docs/commands/system-service/telinit) - Change runlevel
- [`sync`](/docs/commands/system-service/sync) - Flush filesystem buffers
- [`wall`](/docs/commands/system-service/wall) - Send messages to all users

The `halt` command is a fundamental system administration tool that provides controlled system shutdown capabilities. While simple in concept, proper use of halt with appropriate options ensures clean system termination, maintains data integrity, and enables reliable system management procedures. Understanding the various options and their appropriate usage scenarios is essential for system administrators managing Linux systems.