---
title: getcap - Get file capabilities
sidebar_label: getcap
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# getcap - Get file capabilities

The `getcap` command is a Linux utility that displays the file capabilities set on executable files. File capabilities are a fine-grained security mechanism that allows specific privileged operations to be performed by non-root users without giving them full root privileges. This is part of the Linux capabilities system, which divides the power of the superuser into distinct units called capabilities, providing better security granularity than traditional Unix permissions.

## Basic Syntax

```bash
getcap [OPTIONS] [FILE...]
```

## Common Options

### Output Options
- `-v, --verbose` - Display detailed capability information
- `-n, --names` - Show capability names instead of numeric values
- `-r, --recursive` - Process directories recursively
- `-d, --depth` - Limit recursion depth

### Display Options
- `-t, --terse` - Display output in terse format
- `-l, --libcap` - Use libcap output format
- `--help` - Display help information
- `--version` - Show version information

## File Capabilities Overview

Linux capabilities are divided into three sets:

| Set | Description |
|-----|-------------|
| **Permitted** | Capabilities that the process may use |
| **Inheritable** | Capabilities inherited across execve() |
| **Effective** | Capabilities currently enabled for the process |

### Common Capabilities

| Capability | Name | Description |
|------------|------|-------------|
| `CAP_NET_RAW` | Network raw sockets | Use raw and packet sockets |
| `CAP_NET_ADMIN` | Network administration | Configure network interfaces and routing |
| `CAP_SYS_ADMIN` | System administration | Perform system administration tasks |
| `CAP_DAC_OVERRIDE` | Override DAC access | Bypass file read, write, execute permission checks |
| `CAP_CHOWN` | Change file ownership | Make arbitrary changes to file UIDs and GIDs |
| `CAP_FOWNER` | File ownership override | Bypass permission checks on operations that normally require file owner permissions |
| `CAP_SETUID` | Set user ID | Set real user ID |
| `CAP_SETGID` | Set group ID | Set real group ID |
| `CAP_KILL` | Kill processes | Send signals to processes |
| `CAP_SYS_TIME` | System time | Set system clock |
| `CAP_SYS_MODULE` | Kernel modules | Load and unload kernel modules |

## Usage Examples

### Basic Capability Viewing

#### View Single File Capabilities
```bash
# Check capabilities of a specific file
getcap /usr/bin/ping

# Verbose output with detailed information
getcap -v /usr/bin/ping

# Show capability names instead of numbers
getcap -n /usr/bin/ping

# Check multiple files
getcap /usr/bin/ping /usr/bin/traceroute /usr/sbin/tcpdump
```

#### Directory Scanning
```bash
# Check all files in a directory
getcap /usr/bin/

# Recursive scan through directory tree
getcap -r /usr/local/bin/

# Limited depth recursion
getcap -r -d 2 /usr/

# Terse format output
getcap -t /usr/bin/
```

### Advanced Capability Analysis

#### Detailed Information Display
```bash
# Verbose output showing all capability sets
getcap -v /usr/bin/ping

# Libcap format output
getcap -l /usr/bin/ping

# Combined options for comprehensive analysis
getcap -v -n /usr/bin/ping

# Check system binaries with capabilities
getcap -r /usr/bin/ | grep -v "= \+"
```

#### Filtering and Searching
```bash
# Find all files with specific capabilities
getcap -r /usr/ | grep "cap_net_raw"

# Find files with any capabilities
getcap -r /usr/ | grep -v "= \+"

# Count files with capabilities
getcap -r /usr/ | grep -v "= \+" | wc -l

# Search for files with CAP_NET_ADMIN
getcap -r /usr/ | grep -i "net_admin"
```

## Practical Examples

### System Administration

#### Security Audit
```bash
# Audit all files with capabilities
getcap -r / | grep -v "= \+" > /root/capability_audit.txt

# Find files with dangerous capabilities
getcap -r /usr/ | grep -E "(sys_admin|cap_sys_admin|dac_override)"

# Check network-related capabilities
getcap -r /usr/ | grep -E "(net_raw|net_admin|net_bind_service)"

# Audit SUID binaries and compare with capabilities
find / -perm -4000 -type f 2>/dev/null | head -20
getcap $(find / -perm -4000 -type f 2>/dev/null | head -10)

# Check specific system directories
getcap -r /bin/ /sbin/ /usr/bin/ /usr/sbin/
```

#### Capability Management
```bash
# Check current capability status before changes
getcap -v /usr/bin/wireshark

# Verify capability changes
setcap cap_net_raw,cap_net_admin=eip /usr/bin/tcpdump
getcap -v /usr/bin/tcpdump

# Batch check of network tools
for tool in ping traceroute tcpdump nmap; do
    echo "=== $tool ==="
    getcap -v $(which $tool) 2>/dev/null || echo "No capabilities found"
done
```

### Security Analysis

#### Vulnerability Assessment
```bash
# Find files with elevated capabilities
getcap -r /usr/ | grep -i "sys_"

# Check for unexpected capabilities
getcap -r /usr/local/ | grep -v "= \+"

# Monitor for new capabilities
getcap -r /bin/ > /tmp/caps_before.txt
# ... make system changes ...
getcap -r /bin/ > /tmp/caps_after.txt
diff /tmp/caps_before.txt /tmp/caps_after.txt

# Check web server capabilities
getcap -r /var/www/ /usr/sbin/apache2 /usr/sbin/nginx
```

#### Compliance Checking
```bash
# Generate compliance report
echo "=== Capability Audit Report ===" > /root/compliance_report.txt
echo "Date: $(date)" >> /root/compliance_report.txt
echo "" >> /root/compliance_report.txt
echo "Files with CAP_SYS_ADMIN:" >> /root/compliance_report.txt
getcap -r /usr/ | grep -i "sys_admin" >> /root/compliance_report.txt
echo "" >> /root/compliance_report.txt
echo "Files with network capabilities:" >> /root/compliance_report.txt
getcap -r /usr/ | grep -E "(net_raw|net_admin|net_bind_service)" >> /root/compliance_report.txt

# Check for deprecated capabilities
getcap -r /usr/ | grep -E "(cap_sys_module|cap_sys_time)"
```

### Development and Testing

#### Application Development
```bash
# Check development tools capabilities
getcap /usr/bin/gcc /usr/bin/python3 /usr/bin/perl

# Verify application deployment
getcap /opt/myapp/bin/myapp

# Test capability inheritance
getcap -v /usr/bin/sudo

# Check container-related capabilities
getcap -r /usr/bin/ | grep -E "(docker|container|podman)"
```

#### Debugging and Troubleshooting
```bash
# Debug permission issues
getcap -v /usr/bin/ping

# Check if file has expected capabilities
if getcap /usr/bin/ping | grep -q "cap_net_raw"; then
    echo "Ping has network raw capabilities"
else
    echo "Ping lacks network capabilities"
fi

# Verify capability setup after installation
apt-get install tcpdump
getcap -v /usr/sbin/tcpdump

# Check system state
getcap -r /lib/ | grep -v "= \+"
```

## Advanced Usage

### Automation and Scripting

#### Capability Monitoring Script
```bash
#!/bin/bash
# Capability monitoring script

LOG_FILE="/var/log/capability_monitor.log"
DATE=$(date +%Y-%m-%d_%H:%M:%S)

echo "=== Capability Check - $DATE ===" >> "$LOG_FILE"

# Check system directories for capabilities
for dir in /bin /sbin /usr/bin /usr/sbin /usr/local/bin /usr/local/sbin; do
    if [ -d "$dir" ]; then
        echo "Checking $dir:" >> "$LOG_FILE"
        getcap -r "$dir" 2>/dev/null | grep -v "= \+" >> "$LOG_FILE"
    fi
done

# Check for changes in capabilities
if [ -f "/tmp/last_caps.txt" ]; then
    getcap -r /usr/ 2>/dev/null | grep -v "= \+" > /tmp/current_caps.txt
    if ! diff /tmp/last_caps.txt /tmp/current_caps.txt > /dev/null; then
        echo "CAPABILITY CHANGES DETECTED:" >> "$LOG_FILE"
        diff /tmp/last_caps.txt /tmp/current_caps.txt >> "$LOG_FILE"
    fi
    mv /tmp/current_caps.txt /tmp/last_caps.txt
else
    getcap -r /usr/ 2>/dev/null | grep -v "= \+" > /tmp/last_caps.txt
fi

echo "" >> "$LOG_FILE"
```

#### Capability Backup and Restore
```bash
#!/bin/bash
# Backup and restore file capabilities

BACKUP_FILE="/root/capabilities_backup.txt"
RESTORE_LOG="/root/capability_restore.log"

# Backup all capabilities
backup_capabilities() {
    echo "Backing up file capabilities..."
    getcap -r / 2>/dev/null | grep -v "= \+" > "$BACKUP_FILE"
    echo "Backup completed: $BACKUP_FILE"
    echo "Total files with capabilities: $(wc -l < "$BACKUP_FILE")"
}

# Restore capabilities from backup
restore_capabilities() {
    if [ ! -f "$BACKUP_FILE" ]; then
        echo "Error: Backup file not found: $BACKUP_FILE"
        exit 1
    fi

    echo "Restoring capabilities from backup..."
    echo "Restore started at $(date)" > "$RESTORE_LOG"

    while read -r line; do
        if [ -n "$line" ]; then
            file=$(echo "$line" | cut -d' ' -f1)
            caps=$(echo "$line" | cut -d' ' -f2-)

            if [ -f "$file" ]; then
                if setcap "$caps" "$file"; then
                    echo "Restored: $file -> $caps" >> "$RESTORE_LOG"
                else
                    echo "Failed to restore: $file" >> "$RESTORE_LOG"
                fi
            else
                echo "File not found: $file" >> "$RESTORE_LOG"
            fi
        fi
    done < "$BACKUP_FILE"

    echo "Restore completed. Check $RESTORE_LOG for details."
}

case "$1" in
    backup)
        backup_capabilities
        ;;
    restore)
        restore_capabilities
        ;;
    *)
        echo "Usage: $0 {backup|restore}"
        exit 1
        ;;
esac
```

### Performance Optimization

#### Efficient Capability Scanning
```bash
# Use find with getcap for better performance
find /usr/bin -type f -exec getcap {} \; 2>/dev/null | grep -v "= \+"

# Parallel processing with xargs
find /usr -type f -print0 | xargs -0 -P 4 getcap 2>/dev/null | grep -v "= \+"

# Limit to specific file types
find /usr -type f \( -name "*.so*" -o -perm /111 \) -exec getcap {} \; 2>/dev/null

# Cache results for repeated queries
getcap -r /usr/ 2>/dev/null | grep -v "= \+" > /tmp/usr_caps.txt
grep "net_raw" /tmp/usr_caps.txt
```

#### Selective Capability Checking
```bash
# Check only recently modified files
find /usr/bin -mtime -7 -exec getcap {} \; 2>/dev/null

# Check specific file patterns
find /usr -name "*ping*" -exec getcap {} \; 2>/dev/null
find /usr -name "*admin*" -exec getcap {} \; 2>/dev/null

# Check based on file size (large binaries)
find /usr -size +1M -exec getcap {} \; 2>/dev/null
```

## Integration and Automation

### System Integration

#### Capability-Based Access Control
```bash
#!/bin/bash
# Implement capability-based access control

# Function to check if user has capability-aware applications
check_user_capabilities() {
    local username="$1"
    local home_dir="/home/$username"

    echo "Checking capabilities for user: $username"

    # Check user's personal binaries
    if [ -d "$home_dir/bin" ]; then
        echo "Personal binaries with capabilities:"
        getcap -r "$home_dir/bin" 2>/dev/null | grep -v "= \+"
    fi

    # Check group-owned binaries
    echo "Group-accessible binaries with capabilities:"
    find /usr/local/bin -group $(id -g "$username") -exec getcap {} \; 2>/dev/null | grep -v "= \+"
}

# Function to set up capabilities for specific applications
setup_app_capabilities() {
    local app_name="$1"
    local app_path="$2"
    local required_caps="$3"

    echo "Setting up capabilities for $app_name"

    if [ -f "$app_path" ]; then
        setcap "$required_caps" "$app_path"
        getcap -v "$app_path"
        echo "Capabilities set successfully"
    else
        echo "Error: Application not found at $app_path"
    fi
}
```

#### Container Environment Integration
```bash
#!/bin/bash
# Container capability management

# Check container host capabilities
check_container_host_caps() {
    echo "=== Container Host Capabilities ==="

    # Check Docker-related binaries
    if command -v docker >/dev/null 2>&1; then
        echo "Docker capabilities:"
        getcap -v /usr/bin/docker 2>/dev/null || echo "No capabilities found"
    fi

    # Check container runtime capabilities
    for runtime in runc containerd podman; do
        if command -v $runtime >/dev/null 2>&1; then
            echo "$runtime capabilities:"
            getcap -v $(which $runtime) 2>/dev/null || echo "No capabilities found"
        fi
    done
}

# Verify container capability requirements
verify_container_requirements() {
    local container_name="$1"

    echo "Verifying capabilities for container: $container_name"

    # Check if container requires specific capabilities
    docker inspect "$container_name" --format='{{.HostConfig.Capabilities}}' 2>/dev/null || \
    podman inspect "$container_name" --format='{{.HostConfig.Capabilities}}' 2>/dev/null
}
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Permission denied when checking capabilities
sudo getcap -r /root/

# File not found errors
getcap /nonexistent/file

# Use proper error handling
if getcap /usr/bin/ping 2>/dev/null; then
    echo "Capabilities retrieved successfully"
else
    echo "No capabilities or error occurred"
fi
```

#### Output Parsing Issues
```bash
# Handle empty capability sets correctly
getcap /bin/bash | grep -v "= \+" || echo "No capabilities found"

# Parse capability information reliably
file_caps=$(getcap /usr/bin/ping 2>/dev/null)
if [ -n "$file_caps" ] && [[ "$file_caps" != *"= +"* ]]; then
    echo "File has capabilities: $file_caps"
else
    echo "File has no capabilities"
fi
```

#### Performance Issues
```bash
# Slow recursive scans
# Solution: Limit scope or use more specific paths
getcap -r /usr/bin/ | head -20  # Limit output
getcap /usr/bin/ping /usr/bin/traceroute  # Specific files

# Memory usage issues with large scans
# Solution: Process in smaller chunks
for dir in /bin /sbin /usr/bin /usr/sbin; do
    echo "Checking $dir:"
    getcap -r "$dir" 2>/dev/null | grep -v "= \+"
done
```

### Debugging Techniques

#### Trace Capability Operations
```bash
# Use strace to debug capability issues
strace -e capget getcap /usr/bin/ping

# Monitor capability changes in real-time
watch -n 1 'getcap -r /usr/bin/ | grep -v "= \+"'

# Check system capability support
cat /proc/sys/kernel/cap_last_cap

# Verify filesystem supports capabilities
tune2fs -l /dev/sda1 | grep "Filesystem features"
```

#### Verify Capability System
```bash
# Check if capabilities are enabled
grep 'CONFIG_SECURITY_CAPABILITIES=y' /boot/config-$(uname -r) 2>/dev/null || \
echo "Check /proc/kallsyms for cap_capable"

# Test basic capability functionality
sudo setcap cap_net_raw=eip /bin/ping
getcap -v /bin/ping
ping -c 1 127.0.0.1
sudo setcap -r /bin/ping  # Remove capabilities
```

## Related Commands

- [`setcap`](/docs/commands/user-management/setcap) - Set file capabilities
- [`getpcaps`](/docs/commands/user-management/getpcaps) - Get process capabilities
- [`capsh`](/docs/commands/user-management/capsh) - Capability shell utility
- [`chacl`](/docs/commands/user-management/chacl) - Change file access control lists
- [`getfacl`](/docs/commands/user-management/getfacl) - Get file access control lists
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`sudo`](/docs/commands/user-management/sudo) - Execute commands as another user
- [`find`](/docs/commands/file-management/find) - Find files with specific criteria

## Best Practices

1. **Regular Auditing**: Periodically audit files with capabilities to ensure security compliance
2. **Principle of Least Privilege**: Only grant capabilities that are absolutely necessary
3. **Documentation**: Maintain documentation of which capabilities are required by which applications
4. **Version Control**: Track capability changes in configuration management systems
5. **Testing**: Thoroughly test applications in development environments before applying capabilities in production
6. **Monitoring**: Monitor for unexpected capability additions or modifications
7. **Backup**: Regularly backup capability settings for disaster recovery
8. **Review**: Review capabilities after system updates or application upgrades

## Security Tips

1. **Minimize Capabilities**: Grant the minimum set of capabilities required for functionality
2. **Regular Reviews**: Periodically review and remove unnecessary capabilities
3. **Monitor Changes**: Set up monitoring for capability changes
4. **Use File Integrity Monitoring**: Implement tools to monitor unauthorized changes
5. **Segregation**: Separate applications with different capability requirements
6. **Logging**: Enable logging for capability-related operations
7. **Access Control**: Restrict who can modify file capabilities
8. **Testing Environment**: Test capability changes in non-production environments first

The `getcap` command is an essential tool for Linux system security management, providing visibility into the fine-grained privilege system that replaces the all-or-nothing approach of traditional Unix permissions. It enables administrators to maintain security compliance while allowing applications to perform specific privileged operations without full root access.