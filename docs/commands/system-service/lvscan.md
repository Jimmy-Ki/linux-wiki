---
title: lvscan - Scan for Logical Volumes
sidebar_label: lvscan
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lvscan - Scan for Logical Volumes

The `lvscan` command is a crucial utility in the Linux LVM (Logical Volume Manager) suite that scans all available volume groups and reports all logical volumes found in the system. This command is essential for LVM system administrators to discover, verify, and monitor logical volumes across multiple volume groups. `lvscan` provides comprehensive information about logical volume status, attributes, and availability, making it invaluable for storage management, system diagnostics, and maintenance operations in complex storage environments.

## Basic Syntax

```bash
lvscan [OPTIONS] [LV_PATH...]
lvscan [OPTIONS] --all
```

## Common Options

### Display Options
- `-a, --all` - List all logical volumes, including inactive ones
- `-b, --blockdevice` - Display major/minor device numbers
- `-c, --colon` - Generate colon-separated output for scripting
- `-C, --columns` - Display output in columns format
- `-m, --maps` - Display mapping information
- `-n, --noheadings` - Suppress heading line
- `-o, --options` - Specify columns to display
- `-O, --sort` - Sort output by specified columns

### Filter Options
- `-S, --select` - Select logical volumes matching criteria
- `--separator` - Use custom separator for output
- `--unbuffered` - Produce unbuffered output
- `--units` - Display units (h, H, b, B, s, S, k, K, m, M, g, G, t, T, p, P, e, E)

### Logical Volume Status
- `--ignoremonitoring` - Skip monitoring when reporting status
- `--ignorelockingfailure` - Continue without locking
- `--partial` - Handle partial volume groups

### LVM Configuration
- `--config` - Use specific LVM configuration
- `--profile` - Use LVM profile
- `--metadataprofile` - Use metadata profile
- `--commandprofile` - Use command profile

### Debug and Help
- `-h, --help` - Display help information
- `-v, --verbose` - Increase verbosity
- `-d, --debug` - Show debug information
- `--version` - Display version information

## Usage Examples

### Basic Volume Scanning

#### Default Scanning
```bash
# Scan all logical volumes
lvscan

# Output shows active logical volumes
#  ACTIVE            '/dev/vg_name/lv_name' [10.00 GiB] inherit

# Scan with verbose output
lvscan -v

# Scan all volumes including inactive ones
lvscan -a

# Scan specific logical volume
lvscan /dev/vg0/root

# Scan multiple specific volumes
lvscan /dev/vg0/root /dev/vg1/data
```

#### Display Formats
```bash
# Display in columns format
lvscan -C

# Display with device numbers
lvscan -b

# Display with colon-separated format (for scripting)
lvscan -c

# Display with custom separator
lvscan --separator=";" -c

# Display specific columns
lvscan -o lv_name,lv_size,lv_attr
```

### Advanced Scanning Operations

#### Mapping Information
```bash
# Display mapping details
lvscan -m

# Show mapping for all volumes
lvscan -a -m

# Display mapping with verbose output
lvscan -vm

# Show extended mapping information
lvscan -m --units k
```

#### Filtering and Selection
```bash
# Scan volumes matching specific criteria
lvscan --select 'lv_name=~data*'

# Scan volumes of specific size
lvscan --select 'lv_size>10g'

# Scan only active volumes
lvscan --select 'lv_attr=~a'

# Scan only inactive volumes
lvscan --select 'lv_attr!~a'

# Scan volumes in specific volume group
lvscan --select 'vg_name=vg_data'

# Complex selection criteria
lvscan --select 'lv_name=~backup && lv_size>5g'
```

### Volume Group Operations

#### Comprehensive Scanning
```bash
# Scan all volumes in all volume groups
lvscan --all

# Scan with detailed status
lvscan -a -v

# Scan ignoring partial volumes
lvscan --partial

# Scan without locking (for scripts)
lvscan --ignorelockingfailure

# Scan without monitoring checks
lvscan --ignoremonitoring
```

## Practical Examples

### System Administration

#### LVM Inventory Management
```bash
# Complete LVM inventory scan
lvscan -a -C -o vg_name,lv_name,lv_size,lv_attr,lv_path

# Generate LVM report
echo "=== LVM Logical Volume Inventory ===" && lvscan -a

# Scan for inactive volumes that need activation
lvscan -a | grep 'inactive'

# Scan and count volumes by status
lvscan -a | grep -c 'ACTIVE'
lvscan -a | grep -c 'inactive'

# Get detailed volume information
lvscan -a -b -m
```

#### Storage Monitoring
```bash
# Monitor LVM status regularly
watch -n 5 'lvscan -a'

# Check for problematic volumes
lvscan --partial

# Scan and log volume status
lvscan -a > /var/log/lvm_status_$(date +%Y%m%d_%H%M%S).log

# Monitor volume changes
while true; do
    echo "$(date): $(lvscan -a | wc -l) volumes found"
    sleep 60
done
```

### Backup and Recovery

#### Pre-backup Verification
```bash
# Verify all volumes are accessible before backup
lvscan -a && echo "All volumes accessible" || echo "Some volumes inaccessible"

# Scan and check specific backup volumes
lvscan /dev/vg_backup/backup1 /dev/vg_backup/backup2

# Generate backup volume inventory
lvscan --select 'vg_name=vg_backup' -C -o lv_name,lv_size,lv_attr

# Verify snapshot volumes
lvscan --select 'lv_attr=~s'
```

#### Recovery Operations
```bash
# Scan for recoverable volumes after system crash
lvscan --partial

# Identify volumes that need reactivation
lvscan -a | grep 'inactive' | cut -d"'" -f2

# Scan volumes in recovery mode
lvscan --ignorelockingfailure

# Check volume consistency
lvscan -a -v --ignoremonitoring
```

### Automation and Scripting

#### Script-friendly Output
```bash
# Generate colon-separated output for parsing
lvscan -c

# Extract volume names
lvscan -c | cut -d: -f1

# Extract volume sizes
lvscan -c | cut -d: -f4

# Get active volume list
lvscan -c | grep '^ACTIVE' | cut -d: -f1

# Parse volume attributes
lvscan -c | cut -d: -f2
```

#### Automated Volume Management
```bash
#!/bin/bash
# Automatic volume activation script

echo "Scanning for inactive volumes..."
INACTIVE_VOLUMES=$(lvscan -a | grep 'inactive' | grep -o "'/[^']*'" | tr -d "'")

if [ -n "$INACTIVE_VOLUMES" ]; then
    echo "Found inactive volumes:"
    echo "$INACTIVE_VOLUMES"

    for volume in $INACTIVE_VOLUMES; do
        echo "Activating $volume..."
        lvchange -ay $volume
    done

    echo "Volume activation completed"
else
    echo "All volumes are already active"
fi
```

#### Monitoring Script
```bash
#!/bin/bash
# LVM monitoring script

LOG_FILE="/var/log/lvm_monitor.log"
DATE=$(date +%Y-%m-%d %H:%M:%S)

# Scan all volumes
VOLUME_COUNT=$(lvscan -a | wc -l)
ACTIVE_COUNT=$(lvscan -a | grep -c 'ACTIVE')
INACTIVE_COUNT=$(lvscan -a | grep -c 'inactive')

echo "[$DATE] LVM Status: Total: $VOLUME_COUNT, Active: $ACTIVE_COUNT, Inactive: $INACTIVE_COUNT" >> $LOG_FILE

# Alert if inactive volumes found
if [ $INACTIVE_COUNT -gt 0 ]; then
    echo "[$DATE] WARNING: $INACTIVE_COUNT inactive volumes detected" >> $LOG_FILE
    # Send alert (example)
    # echo "LVM Alert: Inactive volumes found" | mail -s "LVM Monitor Alert" admin@domain.com
fi
```

## Advanced Usage

### Performance Optimization

#### Efficient Scanning
```bash
# Fast scan with minimal output
lvscan -a --noheadings

# Scan with specific units for consistent parsing
lvscan -a --units m

# Scan without unnecessary checks
lvscan -a --ignoremonitoring

# Background scanning
nohup lvscan -a > lvscan_output.txt 2>&1 &
```

#### Large LVM Environments
```bash
# Scan specific volume groups only
lvscan --select 'vg_name=vg_data'

# Parallel scanning (multiple volume groups)
for vg in vg_data vg_backup vg_system; do
    lvscan --select "vg_name=$vg" &
done
wait

# Incremental scanning for large systems
lvscan --select 'lv_size>100g'  # Large volumes first
lvscan --select 'lv_size<=100g' # Smaller volumes next
```

### Integration with Other Tools

#### Combined LVM Operations
```bash
# Scan and display with vgdisplay
lvscan -a && vgdisplay

# Scan and check filesystem status
for lv in $(lvscan -c | cut -d: -f1); do
    echo "Checking $lv..."
    fsck -n $lv 2>/dev/null && echo "$lv: OK" || echo "$lv: Issues found"
done

# Integration with lsblk
lsblk && lvscan -a

# Combine with df for mounted volumes
df -h && lvscan -a
```

#### Cross-platform Monitoring
```bash
# Generate JSON output for monitoring systems
lvscan -C --separator="," --noheadings | \
    awk -F, '{
        gsub(/"/, "", $1); gsub(/"/, "", $2);
        printf "{\"vg\":\"%s\",\"lv\":\"%s\",\"size\":\"%s\"}\n", $1, $2, $3
    }'

# Export to monitoring format
lvscan -a | awk '/ACTIVE/ {print $2, $4}' | \
    while read lv size; do
        echo "lvm_volume_status{volume=\"$lv\"} 1"
    done
```

### Troubleshooting

#### Common Issues
```bash
# Scan with debugging information
lvscan -d

# Scan ignoring locking failures
lvscan --ignorelockingfailure

# Scan for partial volumes (damaged VGs)
lvscan --partial

# Verbose scan for detailed diagnosis
lvscan -vv

# Scan with custom configuration
lvscan --config 'log {level=7}'
```

#### Recovery Scenarios
```bash
# Scan after metadata corruption
lvscan --partial -v

# Scan for volumes that failed to activate
lvscan -a | grep 'inactive'

# Force scan of all devices
lvscan --config 'devices { scan = "/dev" filter = [ "a|.*|" ] }'

# Scan with minimal metadata checks
lvscan --config 'metadata { record_lvs_history = 0 }'
```

## Integration and Automation

### System Integration

#### Init Scripts
```bash
#!/bin/bash
# System init script for LVM scanning

# Source LVM configuration
source /etc/lvm/lvm.conf

# Scan all logical volumes
case "$1" in
    start)
        echo "Scanning logical volumes..."
        lvscan -a
        ;;
    stop)
        echo "LVM scan complete"
        ;;
    status)
        lvscan -a -C
        ;;
    *)
        echo "Usage: $0 {start|stop|status}"
        exit 1
        ;;
esac
```

#### Cron Jobs
```bash
# Daily LVM health check
0 2 * * * /usr/sbin/lvscan -a > /var/log/lvm_daily.log 2>&1

# Hourly volume monitoring
0 * * * * /usr/local/scripts/lvm_monitor.sh

# Weekly comprehensive scan
0 3 * * 0 /usr/sbin/lvscan -a -v -m > /var/log/lvm_weekly_$(date +\%Y\%m\%d).log
```

## Best Practices

1. **Use verbose mode** (-v) for detailed diagnostics and troubleshooting
2. **Scan all volumes** (-a) to include inactive volumes in inventory
3. **Use column format** (-C) for better readability in reports
4. **Filter results** with --select for targeted operations
5. **Combine with other LVM tools** for comprehensive management
6. **Schedule regular scans** for proactive monitoring
7. **Log scan results** for audit and troubleshooting purposes
8. **Use appropriate units** (--units) for consistent size reporting
9. **Handle partial volumes** gracefully with --partial option
10. **Consider performance** impact in large LVM environments

## Performance Tips

1. **Use selective scanning** with --select for faster targeted operations
2. **Avoid verbose output** in automated scripts unless needed for debugging
3. **Combine multiple operations** to reduce total scanning time
4. **Use background processes** for large volume scans
5. **Cache scan results** when multiple scripts need volume information
6. **Schedule scans** during low-usage periods for large systems
7. **Use appropriate output formats** to minimize parsing overhead
8. **Consider parallel scanning** for independent volume groups
9. **Monitor scan frequency** to avoid performance impact
10. **Use incremental scanning** for very large LVM deployments

The `lvscan` command is an essential component of LVM administration, providing comprehensive visibility into logical volume status and configuration. Its flexible output formats, filtering capabilities, and integration options make it invaluable for storage management, monitoring, and troubleshooting in Linux environments using LVM.

## Related Commands

- [`lvcreate`](/docs/commands/system-service/lvcreate) - Create logical volumes
- [`lvdisplay`](/docs/commands/system-service/lvdisplay) - Display logical volume information
- [`lvextend`](/docs/commands/system-service/lvextend) - Extend logical volumes
- [`lvreduce`](/docs/commands/system-service/lvreduce) - Reduce logical volumes
- [`lvremove`](/docs/commands/system-service/lvremove) - Remove logical volumes
- [`lvresize`](/docs/commands/system-service/lvresize) - Resize logical volumes
- [`lvchange`](/docs/commands/system-service/lvchange) - Change logical volume attributes
- [`vgscan`](/docs/commands/system-service/vgscan) - Scan volume groups
- [`pvscan`](/docs/commands/system-service/pvscan) - Scan physical volumes
- [`lvs`](/docs/commands/system-service/lvs) - List logical volumes
- [`vgdisplay`](/docs/commands/system-service/vgdisplay) - Display volume group information
- [`pvdisplay`](/docs/commands/system-service/pvdisplay) - Display physical volume information